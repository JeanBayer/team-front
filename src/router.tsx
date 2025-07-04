import { NotProtectedRoute } from "@/components/routes/not-protected-route";
import { ProtectedRoute } from "@/components/routes/protected-route";
import { CreateAccountPage } from "@/pages/create-account/create-account-page";
import { HomeLayout } from "@/pages/home/home-layout";
import { HomePage } from "@/pages/home/home-page";
import { CreateTeamPage } from "@/pages/home/teams/create/create-team-page";
import { JoinTeamPage } from "@/pages/home/teams/join/join-team-page";
import { TeamsPage } from "@/pages/home/teams/teams-page";
import { LandingPage } from "@/pages/landing/landing-page";
import { LoginPage } from "@/pages/login/login-page";
import { createBrowserRouter } from "react-router";
import { CounterPage } from "./pages/home/teams/:teamId/counters/counter-page";
import { CreateCounterPage } from "./pages/home/teams/:teamId/counters/create/create-counter-page";
import { TeamIdPage } from "./pages/home/teams/:teamId/team-id-page";

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
        children: [
          {
            index: true,
            element: <TeamsPage />,
          },
          {
            path: ":teamId",
            children: [
              {
                index: true,
                element: <TeamIdPage />,
              },
              {
                path: "edit",
                element: <TeamIdPage />,
              },
              {
                path: "retrospectives",
                element: <TeamIdPage />,
              },
              {
                path: "counters",
                children: [
                  { index: true, element: <CounterPage /> },
                  { path: "create", element: <CreateCounterPage /> },
                ],
              },
              {
                path: "members",
                element: <TeamIdPage />,
              },
            ],
          },
          {
            path: "create",
            element: <CreateTeamPage />,
          },
          {
            path: "join",
            element: <JoinTeamPage />,
          },
        ],
      },
    ],
  },
]);
