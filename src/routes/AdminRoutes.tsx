import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const AdminRoutes = ({children}: { children: React.ReactNode }) => {
    const { user, isLoading } = useUser();
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (user?.role === 'admin') {
        return children;
    }
    return <Navigate to="/" replace/>;
};

export default AdminRoutes;