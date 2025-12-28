# CyberPeers — Role-Based Admin Panel (Frontend)

Role-based admin panel UI built with React + TypeScript + Vite, Tailwind CSS, and shadcn/ui. Authentication is handled via Firebase Auth, and API calls are made to a backend using a Bearer token (Firebase ID token).

## Links

- Live site : https://cyberpeers.vercel.app
- Server (API): https://cyberpeers-server.vercel.app/
- Frontend GitHub: https://github.com/HedaetShahriar/CyberPeers
- Backend GitHub: https://github.com/HedaetShahriar/CyberPeers-server

# Admin Credentials
 Username: admin@example.com
 Password: password123

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- React Router
- Firebase Authentication
- Axios + TanStack React Query

## Prerequisites

- Node.js 18+ (recommended)
- npm (comes with Node)
- A Firebase project (for Auth)
- A backend API running separately (see “Backend API”)

## Quick Start (Step-by-step)

### 1) Install dependencies

```bash
npm install
```

### 2) Create Firebase project + enable Auth

1. Go to Firebase Console → create a project.
2. Build → Authentication → Get started.
3. Enable at least:
   - Email/Password
   - (Optional) Google
4. Project Settings → General → “Your apps” → Add a Web App.
5. Copy the Firebase web config values.

### 3) Create environment variables

This app reads env vars via `import.meta.env`.

Create a file named `.env.local` in the project root:

```env
# Backend API base URL
VITE_API_URL=http://localhost:5000

# Firebase web config
VITE_API_KEY=...
VITE_AUTH_DOMAIN=...
VITE_PROJECT_ID=...
VITE_STORAGE_BUCKET=...
VITE_MESSAGING_SENDER_ID=...
VITE_APP_ID=...
```

Where these are used:

- Firebase config: [src/firebase/firebase.config.ts](src/firebase/firebase.config.ts)
- API base URL: [src/hooks/useAxiosSecure.tsx](src/hooks/useAxiosSecure.tsx), [src/lib/saveUserInDB.ts](src/lib/saveUserInDB.ts)

### 4) Start the dev server

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`).

## Backend API (Required)

This frontend expects an API at `VITE_API_URL` and sends an `Authorization: Bearer <token>` header.

Token details:

- The token is a Firebase ID token (`user.getIdToken()` / `getIdToken(user)`)
- Your backend should verify it and enforce role-based access control.

Expected endpoints (as currently used by the UI):

- `POST /user`

  - Called after login to upsert user info
  - Used in [src/lib/saveUserInDB.ts](src/lib/saveUserInDB.ts)

- `GET /user?email=...`

  - Fetch current user profile (role/status/createdAt)
  - Used in [src/hooks/useUser.tsx](src/hooks/useUser.tsx)

- `GET /users?email=...`

  - Admin-only: list users
  - Used in [src/pages/UsersManagement.tsx](src/pages/UsersManagement.tsx)

- `PATCH /user/role/:id?email=...`

  - Admin-only: change a user role

- `PATCH /user/status/:id?email=...`

  - Admin-only: suspend/activate user

- `GET /admin/stats?email=...`
  - Admin-only: dashboard stats
  - Used in [src/pages/AdminDashboard.tsx](src/pages/AdminDashboard.tsx)

## App Routes (Frontend)

Routing is defined in [src/routes/router.tsx](src/routes/router.tsx).

- Public

  - `/login`
  - `/register`

- User (requires auth)

  - `/dashboard`
  - `/profile`

- Admin (requires auth + admin role)
  - `/admin/dashboard`
  - `/admin/users`

Guards:

- Public-only (redirects signed-in users away from auth pages): [src/routes/PublicRoutes.tsx](src/routes/PublicRoutes.tsx)
- Auth-required: [src/routes/PrivateRoutes.tsx](src/routes/PrivateRoutes.tsx)
- Admin-only: [src/routes/AdminRoutes.tsx](src/routes/AdminRoutes.tsx)
- Root redirect based on role: [src/routes/DashboardRedirect.tsx](src/routes/DashboardRedirect.tsx)

## Scripts

- `npm run dev` — start dev server
- `npm run build` — typecheck + production build
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint

## Troubleshooting

### “Goes back to /login after refresh”

This usually happens when the backend rejects the Bearer token (401/403), which triggers logout/redirect in the Axios secure client. Make sure:

- `VITE_API_URL` is correct
- Backend is verifying Firebase ID tokens
- Backend returns user profile data for `GET /user?email=...`

### Missing environment variables

If Firebase initialization fails, double-check `.env.local` values and restart `npm run dev` after editing env vars.
