# Attendify Frontend

Modern, secure attendance management system built with React 18, TypeScript, and Vite. Features face verification, QR code scanning, geofencing, and device fingerprinting for comprehensive attendance tracking.

## ✨ Features

### 🎯 Core Functionality
- **Multi-Role Support**: Student, Lecturer, and Admin dashboards with role-based access control
- **Real-time Attendance**: Live attendance tracking with WebSocket support
- **QR Code Scanning**: Dynamic QR codes with 5-second refresh cycle to prevent screenshot sharing
- **Face Verification**: TensorFlow.js-powered face liveness detection (80% confidence minimum)
- **Geofencing**: Automatic location verification based on room boundaries
- **Device Fingerprinting**: FingerprintJS Pro integration for device tracking
- **Multi-Campus Support**: Isolated tenant management with campus/building/room hierarchy

### 🎨 User Experience
- **Dark Mode**: System-aware theme with manual toggle
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Internationalization**: i18next for multi-language support
- **Real-time Notifications**: Toast notifications for attendance events
- **Analytics Dashboard**: Recharts-powered visualizations for attendance insights

### 🔒 Security Features
- **JWT Authentication**: Secure token-based auth with 30-minute sessions
- **Role-Based Authorization**: Protected routes with PrivateRoute and RoleRoute components
- **Face Liveness Detection**: BlazeFace model prevents photo/video spoofing
- **QR Code Timing**: 5-second validity window prevents screenshot sharing
- **Device Binding**: FingerprintJS tracks unique devices (max 3 per student)
- **Geofence Validation**: Room-based location verification (50-200m configurable radius)

## 🛠️ Tech Stack

### Core Framework
- **React 18.3** - UI library with Hooks and Concurrent Features
- **TypeScript** - Type-safe development with strict mode
- **Vite 7.1** - Next-generation build tool with Rolldown (experimental)

### Styling & UI
- **Tailwind CSS 4.1** - Utility-first CSS framework with custom theme
- **PostCSS** - CSS processing with Autoprefixer
- **Lucide React** - Beautiful icon library

### State Management
- **Zustand** - Lightweight state management with persistence
- **React Query (TanStack Query)** - Server state management and caching

### Routing & Navigation
- **React Router v6** - Declarative routing with nested routes
- **PrivateRoute** - Authentication wrapper component
- **RoleRoute** - Role-based authorization component

### Advanced Features
- **TensorFlow.js + BlazeFace** - Face detection and liveness verification
- **FingerprintJS Pro** - Browser fingerprinting for device tracking
- **MSW (Mock Service Worker)** - API mocking for development
- **Recharts** - Composable charting library for analytics

### Data & API
- **Axios** - HTTP client with interceptors
- **Zod** - Schema validation for forms and API responses
- **XLSX.js** - Excel export for attendance reports

### Development Tools
- **ESLint** - Code linting with TypeScript rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks

## 📁 Project Structure

```
attendify-frontend/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images, icons, fonts
│   ├── components/           # React components (Atomic Design)
│   │   ├── atoms/           # Basic building blocks (Button, Input, Badge)
│   │   ├── molecules/       # Component combinations (FormField, Card)
│   │   ├── organisms/       # Complex components (Navbar, Sidebar, AttendanceForm)
│   │   ├── templates/       # Page layouts (DashboardLayout, AuthLayout)
│   │   ├── student/         # Student-specific components
│   │   ├── lecturer/        # Lecturer-specific components
│   │   └── admin/           # Admin-specific components
│   ├── config/              # Configuration files
│   │   ├── env.ts          # Environment variables (QR refresh: 5000ms, Face confidence: 80%)
│   │   └── app.ts          # App constants (auth, attendance, geofence config)
│   ├── contexts/            # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Third-party library configs
│   ├── pages/               # Page components
│   │   ├── auth/           # Login, Register, ForgotPassword
│   │   ├── student/        # Student dashboard and features
│   │   ├── lecturer/       # Lecturer dashboard and features
│   │   ├── admin/          # Admin dashboard and features
│   │   ├── shared/         # Shared pages (Profile, Settings)
│   │   └── errors/         # Error pages (404, 403, 500)
│   ├── routes/              # Routing configuration
│   │   ├── index.tsx       # Main router with all routes
│   │   ├── PrivateRoute.tsx # Authentication wrapper
│   │   └── RoleRoute.tsx   # Role-based authorization
│   ├── services/            # External service integrations
│   │   ├── api/            # API client and endpoints
│   │   ├── mock/           # MSW mock handlers
│   │   ├── storage/        # LocalStorage utilities
│   │   └── websocket/      # WebSocket client
│   ├── store/               # Zustand stores
│   │   ├── authStore.ts    # Authentication state (login, logout, user)
│   │   ├── attendanceStore.ts # Attendance state (sessions, records)
│   │   ├── uiStore.ts      # UI state (theme, sidebar, notifications)
│   │   └── index.ts        # Store exports
│   ├── styles/              # Global styles and Tailwind config
│   ├── types/               # TypeScript type definitions
│   │   ├── user.ts         # User, Student, Lecturer, Admin types
│   │   ├── campus.ts       # Campus, Building, Room, Location types
│   │   ├── class.ts        # Class, ClassSchedule types
│   │   ├── attendance.ts   # AttendanceSession, AttendanceRecord, AttendanceRequest
│   │   ├── api.ts          # API response types, RealtimeEvent
│   │   └── index.ts        # Type exports
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Root component with routing and theme
│   ├── main.tsx             # Application entry point
│   └── index.css            # Tailwind directives and custom styles
├── tests/                    # Test files
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   └── e2e/                 # End-to-end tests
├── .env.example             # Environment variable template
├── .env.local               # Local environment variables (not committed)
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd attendify-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_BASE_URL=ws://localhost:3000
VITE_QR_REFRESH_INTERVAL=5000
VITE_FACE_CONFIDENCE_THRESHOLD=0.8
VITE_FINGERPRINT_API_KEY=your_fingerprintjs_key
```

4. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

## 📜 Available Scripts

```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Run Prettier
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🔐 Authentication Flow

1. User enters credentials on Login page
2. `authStore.login()` sends request to `/auth/login`
3. JWT token stored in localStorage
4. User profile fetched and stored in `authStore`
5. Axios interceptor adds `Authorization: Bearer <token>` to all requests
6. `PrivateRoute` checks authentication state
7. `RoleRoute` verifies user role for protected routes

## 📱 Attendance Check-in Flow

### Student Perspective
1. **Navigate to Active Session** - Student sees active attendance session on dashboard
2. **Face Verification** - Camera opens, TensorFlow.js BlazeFace detects face (80% confidence)
3. **QR Code Scan** - Student scans lecturer's QR code (valid for 5 seconds)
4. **Geofence Validation** - Browser Geolocation API verifies student is within room boundary
5. **Device Fingerprint** - FingerprintJS validates device (max 3 devices per student)
6. **Success** - Attendance recorded with timestamp and verification metadata

### Security Validations (Backend Enforced)
- QR code timestamp must be within 5 seconds of server time
- Face verification confidence score ≥ 80%
- Student location must be within room's geofence radius (50-200m)
- Device fingerprint must be recognized (or added if under limit)
- Session must be active and not expired

## 🏗️ Architecture Decisions

### Why Zustand over Redux?
- **Simpler API**: No boilerplate, reducers, or actions
- **Better TypeScript**: Native type inference
- **Smaller Bundle**: ~1KB vs 20KB for Redux Toolkit
- **Persist Middleware**: Built-in localStorage sync

### Why Vite over Create React App?
- **10x Faster**: Native ES modules, no bundling in dev
- **Rolldown Experimental**: Rust-powered build tool (even faster than esbuild)
- **Better DX**: Instant HMR, optimized builds

### Why TensorFlow.js over WebRTC?
- **Client-side Processing**: No video streaming to server
- **Privacy**: Face data never leaves device
- **BlazeFace Model**: Lightweight and fast (200ms inference)

### Why MSW over JSON Server?
- **Service Worker**: Intercepts requests at network level
- **No Backend Required**: Develop features without waiting for API
- **Type-safe Mocks**: TypeScript handlers match real API

## 🎯 Key Configuration

### Environment Variables (.env.local)
```env
VITE_QR_REFRESH_INTERVAL=5000        # 5 seconds
VITE_FACE_CONFIDENCE_THRESHOLD=0.8   # 80% confidence
VITE_MAX_CHECK_IN_ATTEMPTS=3         # Anti-spam
VITE_SESSION_TIMEOUT=1800000         # 30 minutes
```

### Geofence Configuration (src/config/app.ts)
```typescript
geofence: {
  enabled: true,
  minRadius: 50,   // 50 meters
  maxRadius: 200,  // 200 meters
  defaultRadius: 100
}
```

### Theme Configuration (tailwind.config.js)
```javascript
theme: {
  colors: {
    primary: { /* Blue shades */ },
    secondary: { /* Gray shades */ },
    accent: { /* Indigo shades */ }
  },
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace']
  }
}
```

## 🧪 Testing Strategy

- **Unit Tests**: Components, hooks, utilities (Jest + React Testing Library)
- **Integration Tests**: Store interactions, API calls (MSW)
- **E2E Tests**: Critical user flows (Playwright/Cypress)

## 📚 Documentation

- See `CLAUDE.md` for complete feature specifications
- See `docs/` folder for architecture diagrams (coming soon)
- See inline JSDoc comments for component documentation

## 🛠️ Development Workflow

### Adding a New Feature
1. Create types in `src/types/`
2. Add store slice in `src/store/` if needed
3. Create components in `src/components/` (Atomic Design)
4. Add page in `src/pages/`
5. Update routes in `src/routes/index.tsx`
6. Write tests in `tests/`

### Commit Conventions
```
feat: Add QR code scanning component
fix: Resolve face detection memory leak
docs: Update README with deployment steps
style: Format code with Prettier
refactor: Extract attendance logic to custom hook
test: Add unit tests for authStore
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output in `dist/` folder ready for deployment to:
- **Vercel** (recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **Firebase Hosting**

### Environment Variables for Production
Set in hosting platform's dashboard:
```
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_WS_BASE_URL=wss://api.yourdomain.com
VITE_FINGERPRINT_API_KEY=<production_key>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a capstone project at CADT (Cambodia Academy of Digital Technology).

## 👥 Team

- **Developer**: [Your Name]
- **Advisor**: [Advisor Name]
- **Institution**: CADT

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React, TypeScript, and Vite**
