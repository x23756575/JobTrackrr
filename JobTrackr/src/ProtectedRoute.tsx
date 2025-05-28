import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loaded } = useAuth();

    if (!loaded) return <div>Loading...</div>;
    if (!user) return <Navigate to="/" replace />;

    return <>{children}</>;
};

export default ProtectedRoute;
