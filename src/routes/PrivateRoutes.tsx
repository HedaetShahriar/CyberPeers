import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const PrivateRoutes = ({ children }:  { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const {user: profileUser, isLoading} = useUser();

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }
  if(profileUser?.role !== "user"){
    return <Navigate to="/" replace />;
  }
  if (user ) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
