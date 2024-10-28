import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Welcome from './pages/Welcome';
import RootLayout from './layouts/RootLayout';
import './app.scss';
import Error from './pages/error/Error';
import Dashboard from './pages/app/Dashboard';
import AppLayout from './layouts/AppLayout';
import WelcomeLayout from './layouts/WelcomeLayout';
import AuthProvider from './providers/AuthProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route path="/" element={<WelcomeLayout />} errorElement={<Error />}>
        <Route path="/" element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/" element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} errorElement={<Error />}/>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>,
)
