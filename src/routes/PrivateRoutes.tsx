import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainLayoutSkeleton from "../layout/MainLayoutSkeleton";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <MainLayoutSkeleton />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
