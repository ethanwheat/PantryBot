import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthProvider from '../providers/AuthProvider';
import ThemedNavbar from '../components/navigation/ThemedNavbar';

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