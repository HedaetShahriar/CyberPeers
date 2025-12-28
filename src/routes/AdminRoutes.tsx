import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";

const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { user, isLoading } = useUser();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // Don't redirect while profile is still resolving
  if (isLoading || !user) {
    return <div>Loading...</div>;
  }
  if (user?.role === "admin") {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default AdminRoutes;
