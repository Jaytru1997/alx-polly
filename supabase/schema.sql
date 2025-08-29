-- Supabase Database Schema for Polls and Votes
-- Run this in the Supabase SQL editor or via CLI

-- Extensions (gen_random_uuid)
create extension if not exists pgcrypto;

-- TABLE: polls
create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_by uuid not null references auth.users(id) on delete cascade,
  is_active boolean not null default true,
  allow_anonymous boolean not null default false,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- TABLE: poll_options
create table if not exists public.poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  text text not null,
  position int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_poll_options_poll_id on public.poll_options(poll_id);

-- TABLE: votes
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  option_id uuid not null references public.poll_options(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  anon_token text,
  created_at timestamptz not null default now(),
  constraint votes_user_or_token_chk check (
    (user_id is not null) or (anon_token is not null)
  )
);

create index if not exists idx_votes_poll_id on public.votes(poll_id);
create index if not exists idx_votes_option_id on public.votes(option_id);

-- One vote per authenticated user per poll
create unique index if not exists uq_votes_poll_user on public.votes(poll_id, user_id)
  where user_id is not null;

-- One vote per anon token per poll
create unique index if not exists uq_votes_poll_anon on public.votes(poll_id, anon_token)
  where anon_token is not null;

-- TRIGGERS: updated_at maintenance
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_polls_updated_at on public.polls;
create trigger set_polls_updated_at
before update on public.polls
for each row execute function public.set_updated_at();

drop trigger if exists set_poll_options_updated_at on public.poll_options;
create trigger set_poll_options_updated_at
before update on public.poll_options
for each row execute function public.set_updated_at();

-- RLS
alter table public.polls enable row level security;
alter table public.poll_options enable row level security;
alter table public.votes enable row level security;

-- POLICIES: polls
drop policy if exists "polls_select_all" on public.polls;
create policy "polls_select_all"
  on public.polls for select
  to anon, authenticated
  using (true);

drop policy if exists "polls_insert_owner" on public.polls;
create policy "polls_insert_owner"
  on public.polls for insert
  to authenticated
  with check (created_by = auth.uid());

drop policy if exists "polls_update_owner" on public.polls;
create policy "polls_update_owner"
  on public.polls for update
  to authenticated
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

drop policy if exists "polls_delete_owner" on public.polls;
create policy "polls_delete_owner"
  on public.polls for delete
  to authenticated
  using (created_by = auth.uid());

-- POLICIES: poll_options
drop policy if exists "options_select_all" on public.poll_options;
create policy "options_select_all"
  on public.poll_options for select
  to anon, authenticated
  using (true);

drop policy if exists "options_cud_owner" on public.poll_options;
create policy "options_cud_owner"
  on public.poll_options for all
  to authenticated
  using (exists (
    select 1 from public.polls p
    where p.id = poll_options.poll_id and p.created_by = auth.uid()
  ))
  with check (exists (
    select 1 from public.polls p
    where p.id = poll_options.poll_id and p.created_by = auth.uid()
  ));

-- POLICIES: votes
drop policy if exists "votes_select_all" on public.votes;
create policy "votes_select_all"
  on public.votes for select
  to anon, authenticated
  using (true);

-- No direct insert/update/delete to votes. Use RPC cast_vote.

-- RPC: cast_vote
create or replace function public.cast_vote(
  in p_poll_id uuid,
  in p_option_id uuid,
  in p_anon_token text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_allow_anonymous boolean;
  v_option_poll_id uuid;
  v_user_id uuid;
begin
  -- Validate option belongs to poll
  select poll_id into v_option_poll_id from public.poll_options where id = p_option_id;
  if v_option_poll_id is null or v_option_poll_id <> p_poll_id then
    raise exception 'Option does not belong to poll';
  end if;

  -- Get poll flags
  select allow_anonymous into v_allow_anonymous from public.polls where id = p_poll_id;
  if v_allow_anonymous is null then
    raise exception 'Poll not found';
  end if;

  -- Get current user id
  v_user_id := auth.uid();

  if v_user_id is null then
    -- Anonymous case
    if not v_allow_anonymous then
      raise exception 'Anonymous voting not allowed';
    end if;
    if p_anon_token is null then
      raise exception 'anon_token required for anonymous voting';
    end if;

    -- Upsert anonymous vote (one per poll/token)
    insert into public.votes (poll_id, option_id, anon_token)
    values (p_poll_id, p_option_id, p_anon_token)
    on conflict on constraint uq_votes_poll_anon
    do update set option_id = excluded.option_id;
  else
    -- Authenticated user: upsert by (poll_id, user_id)
    insert into public.votes (poll_id, option_id, user_id)
    values (p_poll_id, p_option_id, v_user_id)
    on conflict on constraint uq_votes_poll_user
    do update set option_id = excluded.option_id;
  end if;
end;
$$;

-- Grant execute on RPC to anon and authenticated
revoke all on function public.cast_vote(uuid, uuid, text) from public;
grant execute on function public.cast_vote(uuid, uuid, text) to anon, authenticated;

-- Realtime: enable on votes
-- In Supabase UI, turn on Realtime for table public.votes filtered by poll_id as needed


