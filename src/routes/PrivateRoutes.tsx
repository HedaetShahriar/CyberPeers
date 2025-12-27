import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }:  { children: React.ReactNode }) => {
  const { user, loading } = {
    user: { id: '123' },
    loading: false,
  };

  console.log('PrivateRoutes - user:', user, 'loading:', loading);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
