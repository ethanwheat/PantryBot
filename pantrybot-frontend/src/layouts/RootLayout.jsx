import { Outlet } from "react-router-dom";
import AuthProvider from "../providers/AuthProvider";

export default function RootLayout() {
    return (
    <AuthProvider>
        <Outlet />
    </AuthProvider>
    )
}
