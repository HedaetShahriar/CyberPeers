import { Navigate } from "react-router-dom";

const AdminRoutes = ({children}: { children: React.ReactNode }) => {
    const { user, isLoading } = {
        user: { role: 'admin' },
        isLoading: false,
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (user?.role === 'admin') {
        return children;
    }
    return <Navigate to="/" replace/>;
};

export default AdminRoutes;