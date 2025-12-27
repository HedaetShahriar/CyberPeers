import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";

function DashboardRedirect() {
  const { user: authUser, loading: authLoading } = useAuth();
  const { user, isLoading } = useUser();

  // Firebase session restoration is async; don't redirect early on refresh.
  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // Profile fetch can fail (API down, token rejected, etc.).
  // If we have an authenticated Firebase user, keep them in the app.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user?.role === "admin" ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}
export default DashboardRedirect;
