import { NotProtectedRoute } from "@/components/routes/not-protected-route";
import { ProtectedRoute } from "@/components/routes/protected-route";
import { CreateAccountPage } from "@/pages/create-account/create-account-page";
import { HomeLayout } from "@/pages/home/home-layout";
import { HomePage } from "@/pages/home/home-page";
import { CounterIdPage } from "@/pages/home/teams/:teamId/counters/:counterId/counter-id-page";
import { EditCounterPage } from "@/pages/home/teams/:teamId/counters/:counterId/edit/edit-counter-page";
import { CounterPage } from "@/pages/home/teams/:teamId/counters/counter-page";
import { CreateCounterPage } from "@/pages/home/teams/:teamId/counters/create/create-counter-page";
import { RetroIdPage } from "@/pages/home/teams/:teamId/retros/:retroId/retro-id-page";
import { CreateRetroPage } from "@/pages/home/teams/:teamId/retros/create/create-retro-page";
import { RetrosPage } from "@/pages/home/teams/:teamId/retros/retros-page";
import { TeamIdPage } from "@/pages/home/teams/:teamId/team-id-page";
import { CreateTeamPage } from "@/pages/home/teams/create/create-team-page";
import { JoinTeamPage } from "@/pages/home/teams/join/join-team-page";
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
                children: [
                  { index: true, element: <RetrosPage /> },
                  { path: "create", element: <CreateRetroPage /> },
                  {
                    path: ":retroId",
                    children: [{ index: true, element: <RetroIdPage /> }],
                  },
                ],
              },
              {
                path: "counters",
                children: [
                  { index: true, element: <CounterPage /> },
                  { path: "create", element: <CreateCounterPage /> },
                  {
                    path: ":counterId",
                    children: [
                      { index: true, element: <CounterIdPage /> },
                      { path: "edit", element: <EditCounterPage /> },
                    ],
                  },
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
