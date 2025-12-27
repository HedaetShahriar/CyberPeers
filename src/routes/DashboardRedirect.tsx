import { Navigate } from "react-router-dom";


function DashboardRedirect() {
  const  user = { role: "admin" }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}
export default DashboardRedirect;