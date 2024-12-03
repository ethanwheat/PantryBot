import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Welcome from "./pages/Welcome";
import RootLayout from "./layouts/RootLayout";
import "./app.scss";
import Error from "./pages/Error";
import Dashboard from "./pages/app/Dashboard";
import AppLayout from "./layouts/AppLayout";
import WelcomeLayout from "./layouts/WelcomeLayout";
import AuthProvider from "./providers/AuthProvider";
import Onboarding from "./pages/Onboarding";
import OnboardingLayout from "./layouts/OnboardingLayout";
import routes from "./constants/routes";
import GroceryLists from "./pages/app/GroceryLists";
import Pantry from "./pages/app/Pantry";
import Recipes from "./pages/app/Recipes";
import Settings from "./pages/app/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.index} element={<RootLayout />} errorElement={<Error />}>
      <Route element={<WelcomeLayout />}>
        <Route path={routes.index} element={<Welcome />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<Signup />} />
      </Route>
      <Route element={<OnboardingLayout />}>
        <Route path={routes.onboarding} element={<Onboarding />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path={routes.app.dashboard} element={<Dashboard />} />
        <Route path={routes.app.groceryLists} element={<GroceryLists />} />
        <Route path={routes.app.pantry} element={<Pantry />} />
        <Route path={routes.app.recipes} element={<Recipes />} />
        <Route path={routes.app.settings} element={<Settings />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
