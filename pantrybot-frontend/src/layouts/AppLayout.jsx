import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import routes from '../constants/routes';
import ThemedNavbar from '../components/navigation/ThemedNavbar';
import { useAuth } from '../providers/AuthProvider';

export default function AppLayout() {
    const { user } = useAuth();

    // Redirect user to login page if not logged in.
    if (!user) {
        return <Navigate to={routes.index} />;
    }

    return (
        <>
            <Outlet />
        </>
    )
}
