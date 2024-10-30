import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider';
import routes from '../constants/routes';

export default function AppLayout() {
    const { token } = useAuth();

    // Redirect user to login page if not logged in.
    if (!token) {
        return <Navigate to={routes.index} />;
    }

    return (
        <>
            <Outlet />
        </>
    )
}