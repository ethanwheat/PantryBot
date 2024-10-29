import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthProvider from '../providers/AuthProvider';
import ThemedNavbar from '../components/navigation/ThemedNavbar';

export default function AppLayout() {
    return (
        <AuthProvider>
            <ThemedNavbar />
            <Outlet />
        </AuthProvider>
    )
}
