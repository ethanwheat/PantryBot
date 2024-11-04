import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider';
import routes from '../constants/routes';

export default function OnboardingLayout() {
    const { session } = useAuth();

    // Redirect user to login page if not logged in.
    if (!session) {
        return <Navigate to={routes.index} />;
    }

    // Redirect user if onboarded.
    if (session.onboarded) {
        return <Navigate to={routes.dashboard} />;
    }

    return (
        <>
            <Outlet />
        </>
    )
}