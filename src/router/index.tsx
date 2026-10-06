import { createBrowserRouter, Navigate } from "react-router-dom";
import { SplashView } from "../views/Splash/SplashView";
import { LoginView, RegisterView, ForgotPasswordView } from "../views/Auth";
import { DashboardView } from "../views/Dashboard/DashboardView";
import { OverviewPage } from "../views/Overview";
import { SettingsPage } from "../views/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashView />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordView />,
  },
  {
    path: "/dashboard",
    element: <DashboardView />,
    children: [
      {
        index: true,
        element: <Navigate to="overview" replace />,
      },
      {
        path: "home",
        element: <Navigate to="/dashboard/overview" replace />,
      },
      {
        path: "overview",
        element: <OverviewPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
