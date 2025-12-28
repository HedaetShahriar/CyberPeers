import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import DashboardRedirect from "./DashboardRedirect";
import MainLayout from "../layout/MainLayout";
import PublicRoutes from "./PublicRoutes";
import { AdminDashboard } from "../pages/AdminDashboard";
import { UsersManagement } from "../pages/UsersManagement";
import { UserDashboard } from "../pages/UserDashboard";
import ProfilePage from "../pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoutes>
        <Register />
      </PublicRoutes>
    ),
  },
  { path: "/unauthorized", element: <h1>Unauthorized Access</h1> },

  { path: "/", element: <DashboardRedirect /> },

  // Admin Routes
  {
    path: "/admin",
    element: (
      <AdminRoutes>
        <MainLayout />
      </AdminRoutes>
    ),
    children: [
      { path: "dashboard", element:<AdminDashboard /> },
      { path: "users", element: <UsersManagement /> },
    ],
  },

  // User Routes
  {
    element: (
      <PrivateRoutes>
        <MainLayout />
      </PrivateRoutes>
    ),
    children: [
      { path: "/dashboard", element: <UserDashboard /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
