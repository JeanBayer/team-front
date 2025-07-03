import { NotProtectedRoute } from "@/components/routes/not-protected-route";
import { ProtectedRoute } from "@/components/routes/protected-route";
import { CreateAccountPage } from "@/pages/create-account/create-account-page";
import { HomeLayout } from "@/pages/home/home-layout";
import { HomePage } from "@/pages/home/home-page";
import { TeamsPage } from "@/pages/home/teams/teams-page";
import { LandingPage } from "@/pages/landing/landing-page";
import { LoginPage } from "@/pages/login/login-page";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/landing",
    element: (
      <NotProtectedRoute>
        <LandingPage />
      </NotProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <NotProtectedRoute>
        <LoginPage />
      </NotProtectedRoute>
    ),
  },
  {
    path: "/create-account",
    element: (
      <NotProtectedRoute>
        <CreateAccountPage />
      </NotProtectedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/teams",
        element: <TeamsPage />,
      },
    ],
  },
]);
