# PollApp - Next.js Polling Application

A modern, full-stack polling application built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Supabase Auth. PollApp allows users to create polls, vote on them, and view results.

## 🚀 Features

- **User Authentication (Supabase)**: Email/password signup and login
- **Create Polls**: Build custom polls with multiple options and descriptions
- **Vote on Polls**: Participate in polls created by the community
- **Protected Routes**: Secure pages like dashboard and create poll
- **Responsive Design**: Modern UI that works on all devices
- **Dashboard**: Personal dashboard to manage your polls and view statistics

## 🏗️ Project Structure

```text
alx-polly/
├── app/                          # Next.js app directory
│   ├── auth/                     # Authentication pages
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── polls/                   # Poll-related pages
│   │   ├── create/              # Create new poll page
│   │   ├── [id]/                # Individual poll detail page
│   │   └── page.tsx             # Browse all polls page
│   ├── dashboard/               # User dashboard page (protected)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with header/footer
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # Shadcn UI components
│   │   ├── button.tsx          # Button component
│   │   ├── input.tsx           # Input component
│   │   └── card.tsx            # Card components
│   ├── auth/                    # Authentication components
│   │   ├── auth-provider.tsx   # Auth context provider (Supabase session)
│   │   ├── protected-route.tsx # Client wrapper for protected pages
│   │   ├── login-form.tsx      # Login form (email/password)
│   │   └── register-form.tsx   # Registration form (email/password)
│   ├── polls/                   # Poll-related components
│   │   ├── poll-card.tsx       # Poll display card
│   │   └── create-poll-form.tsx # Poll creation form
│   └── layout/                  # Layout components
│       ├── header.tsx          # Navigation header
│       └── footer.tsx          # Footer component
├── lib/                         # Utility libraries
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts            # Poll, User, and related types
│   ├── supabase/                # Supabase client utilities
│   │   └── client.ts           # Browser Supabase client
│   └── utils.ts                # Utility functions
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Auth**: Supabase Auth (`@supabase/supabase-js`)
- **State Management**: React hooks + Context (AuthProvider)
- **Routing**: Next.js built-in routing

## 🔐 Authentication (Supabase)

This project uses Supabase for authentication. The app initializes a browser client and provides session/user state via an `AuthProvider`. Sensitive routes are gated using a `ProtectedRoute` client component, and auth pages perform server-side redirects if a session exists.

- `lib/supabase/client.ts`: Creates the Supabase browser client.
- `components/auth/auth-provider.tsx`: Manages session via `supabase.auth.getSession()` and `onAuthStateChange`.
- `components/auth/protected-route.tsx`: Redirects unauthenticated users to `/auth/login`.
- `app/auth/login/page.tsx` and `app/auth/register/page.tsx`: Redirect to `/dashboard` if already authenticated (server components).

### Environment Variables

Create a `.env.local` in the project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these in your Supabase project's Settings → API.

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd alx-polly
```

1. Install dependencies:

```bash
npm install
```

1. Configure environment variables:

Create `.env.local` with your Supabase keys (see above).

1. Run the development server:

```bash
npm run dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ▶️ Usage

- Visit `/auth/register` to create an account, or `/auth/login` to sign in.
- After login, you'll be redirected to `/dashboard`.
- Protected pages include `/dashboard` and `/polls/create`.

## 🎯 Key Components

### Authentication System

- `LoginForm`: Email/password sign-in using Supabase
- `RegisterForm`: Email/password signup; stores `name` in user metadata
- `AuthProvider`: Context with `user`, `isLoading`, and `signOut()`
- `ProtectedRoute`: Client wrapper to guard pages

### Poll Management

- **CreatePollForm**: Dynamic form for creating new polls with multiple options
- **PollCard**: Display component for poll information in lists
- **Poll Detail Page**: Individual poll view with voting functionality

### Layout Components

- **Header**: Navigation bar with links to polls, create, and authentication
- **Footer**: Simple footer with project information
- **Dashboard**: User overview with statistics and quick actions

## 🔧 Development

### Adding New Features

1. Create new components in the appropriate `components/` subdirectory
2. Add new pages in the `app/` directory following Next.js 13+ conventions
3. Update types in `lib/types/index.ts` if needed
4. Use existing Shadcn UI components for consistency

### Styling

- Use Tailwind CSS classes for styling
- Follow the existing design patterns
- Use the `cn()` utility function for conditional classes

### State Management

- Local component state with hooks
- Global auth state via Context API (`AuthProvider`)

## 🚧 TODO / Upcoming Features

- [ ] Persist polls to a database (e.g., Supabase/Postgres)
- [ ] Add database integration (Prisma + PostgreSQL)
- [ ] Real-time updates with WebSockets
- [ ] Poll sharing and social features
- [ ] Advanced poll types (ranked choice, multiple selection)
- [ ] User profile management
- [ ] Poll analytics and insights
- [ ] Mobile app (React Native)

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the development team

---

Built with ❤️ using Next.js and modern web technologies.
