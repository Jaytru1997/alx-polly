# PollApp - Next.js Polling Application

A modern, full-stack polling application built with Next.js 15, TypeScript, and Tailwind CSS. PollApp allows users to create polls, vote on them, and view real-time results.

## 🚀 Features

- **User Authentication**: Sign up, sign in, and manage user accounts
- **Create Polls**: Build custom polls with multiple options and descriptions
- **Vote on Polls**: Participate in polls created by the community
- **Real-time Results**: See poll results update instantly with beautiful visualizations
- **Responsive Design**: Modern UI that works on all devices
- **Dashboard**: Personal dashboard to manage your polls and view statistics

## 🏗️ Project Structure

```
alx-polly/
├── app/                          # Next.js app directory
│   ├── auth/                     # Authentication pages
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── polls/                   # Poll-related pages
│   │   ├── create/              # Create new poll page
│   │   ├── [id]/                # Individual poll detail page
│   │   └── page.tsx             # Browse all polls page
│   ├── dashboard/                # User dashboard page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with header/footer
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # Shadcn UI components
│   │   ├── button.tsx          # Button component
│   │   ├── input.tsx           # Input component
│   │   └── card.tsx            # Card components
│   ├── auth/                    # Authentication components
│   │   ├── login-form.tsx      # Login form
│   │   └── register-form.tsx   # Registration form
│   ├── polls/                   # Poll-related components
│   │   ├── poll-card.tsx       # Poll display card
│   │   └── create-poll-form.tsx # Poll creation form
│   └── layout/                  # Layout components
│       ├── header.tsx          # Navigation header
│       └── footer.tsx          # Footer component
├── lib/                         # Utility libraries
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts            # Poll, User, and related types
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
- **State Management**: React hooks (useState, useEffect)
- **Routing**: Next.js built-in routing

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd alx-polly
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Key Components

### Authentication System

- **LoginForm**: User sign-in with email and password
- **RegisterForm**: User registration with name, email, and password
- **Header**: Navigation with authentication status

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

- Use React hooks for local component state
- TODO: Implement global state management (Context API or Zustand) for user authentication

## 🚧 TODO / Upcoming Features

- [ ] Implement actual authentication backend
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
