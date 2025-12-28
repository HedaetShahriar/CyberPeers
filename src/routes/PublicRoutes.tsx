import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainLayoutSkeleton from "@/layout/MainLayoutSkeleton";

type Props = {
  children: ReactNode;
};

const PublicRoutes = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <MainLayoutSkeleton />;
  }

  // If already signed in, block access to /login and /register.
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoutes;
