import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthProvider from '../providers/AuthProvider';

export default function AppLayout() {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}
