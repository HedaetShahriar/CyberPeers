# CyberPeers — Role-Based Admin Panel (MERN)

CyberPeers is a role-based Admin Panel built on the MERN stack.

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express + MongoDB (separate repository)

Authentication is **JWT-based**: the frontend uses Firebase Authentication and includes a **Bearer token** (Firebase ID token — a JWT) in requests to the backend. The backend is responsible for verifying the JWT and enforcing **role-based access control (RBAC)**.

## Project Links

- Live demo: https://cyberpeers.vercel.app
- Server (API): https://cyberpeers-server.vercel.app/
- GitHub (Frontend): https://github.com/HedaetShahriar/CyberPeers
- GitHub (Backend): https://github.com/HedaetShahriar/CyberPeers-server

Quick routes:

- Admin Dashboard: https://cyberpeers.vercel.app/admin/dashboard
- Admin Users: https://cyberpeers.vercel.app/admin/users

## Sample Admin Credentials

- Email: admin@example.com
- Password: password123

## Tech Stack

- **MERN**: React (frontend) + Node/Express (backend) + MongoDB (database)
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- React Router (protected routes)
- Firebase Authentication (JWT issuance)
- Axios + TanStack React Query (data fetching)

## Assignment Requirements Coverage

### Authentication & Access Control

- **JWT-based authentication**: Firebase ID token (JWT) sent as `Authorization: Bearer <token>`
- **Protected routes**: client-side route guards prevent access without authentication
- **RBAC enforced on frontend and backend**:
  - Frontend restricts admin routes and role-specific navigation
  - Backend must validate JWTs and enforce admin-only endpoints

### Admin Role Capabilities

- Admin dashboard with basic statistics: `/admin/dashboard`
- View and manage users: `/admin/users`
- Assign roles (admin/user)
- Activate/suspend user accounts

### User Role Capabilities

- User dashboard (authenticated): `/dashboard`
- Profile page (authenticated): `/profile`
- Restricted access: admin routes and admin APIs are not accessible

### UI Requirements

- Clean, responsive layout
- Sidebar navigation with role-based visibility
- Tailwind CSS + shadcn/ui components (including skeleton loaders)

## Prerequisites

- Node.js 18+ (recommended)
- npm
- A Firebase project (Authentication enabled)
- Backend API running separately (see “Backend Setup”)

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure Firebase Authentication

1. Create a Firebase project.
2. Enable **Email/Password** authentication (Google is optional).
3. Create a Firebase Web App and copy the web config values.

### 3) Configure environment variables

Create `.env.local` in the project root (Vite reads these via `import.meta.env`):

```env
VITE_API_URL=http://localhost:5000

VITE_API_KEY=...
VITE_AUTH_DOMAIN=...
VITE_PROJECT_ID=...
VITE_STORAGE_BUCKET=...
VITE_MESSAGING_SENDER_ID=...
VITE_APP_ID=...
```

Used in:

- Firebase config: [src/firebase/firebase.config.ts](src/firebase/firebase.config.ts)
- API client: [src/hooks/useAxiosSecure.tsx](src/hooks/useAxiosSecure.tsx)
- User upsert helper: [src/lib/saveUserInDB.ts](src/lib/saveUserInDB.ts)

### 4) Start the development server

```bash
npm run dev
```

Vite will print the local URL (commonly `http://localhost:5173`).

## Backend Setup (Required)

This frontend depends on the backend repository:

- https://github.com/HedaetShahriar/CyberPeers-server

Start the backend and set `VITE_API_URL` to its base URL.

## Backend API Expectations

All protected requests include:

- `Authorization: Bearer <token>`

Token notes:

- The token is a Firebase ID token and is a **JWT**.
- The backend must verify this JWT and enforce RBAC.

Endpoints used by the frontend:

- `POST /user` (upsert current user) — [src/lib/saveUserInDB.ts](src/lib/saveUserInDB.ts)
- `GET /user?email=...` (current user profile) — [src/hooks/useUser.tsx](src/hooks/useUser.tsx)
- `GET /users?email=...` (admin: list users) — [src/pages/UsersManagement.tsx](src/pages/UsersManagement.tsx)
- `PATCH /user/role/:id?email=...` (admin: change role)
- `PATCH /user/status/:id?email=...` (admin: activate/suspend)
- `GET /admin/stats?email=...` (admin: dashboard stats) — [src/pages/AdminDashboard.tsx](src/pages/AdminDashboard.tsx)

## Frontend Routes

Routing is defined in [src/routes/router.tsx](src/routes/router.tsx).

- Public: `/login`, `/register`
- User (auth required): `/dashboard`, `/profile`
- Admin (auth + admin role): `/admin/dashboard`, `/admin/users`

Guards:

- Public-only: [src/routes/PublicRoutes.tsx](src/routes/PublicRoutes.tsx)
- Auth required: [src/routes/PrivateRoutes.tsx](src/routes/PrivateRoutes.tsx)
- Admin only: [src/routes/AdminRoutes.tsx](src/routes/AdminRoutes.tsx)
- Role-based redirect: [src/routes/DashboardRedirect.tsx](src/routes/DashboardRedirect.tsx)

## Scripts

- `npm run dev` — start development server
- `npm run build` — typecheck + production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Troubleshooting

### Redirects to `/login` after refresh

This typically indicates the backend rejected the Bearer token (401/403), which triggers a logout/redirect in the secure Axios client.

Checklist:

- Confirm `VITE_API_URL` is correct
- Confirm the backend verifies Firebase ID tokens
- Confirm `GET /user?email=...` returns the expected profile

### Missing environment variables

If Firebase initialization fails, re-check `.env.local` and restart `npm run dev` after changes.
