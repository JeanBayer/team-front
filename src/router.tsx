import { CreateAccountPage } from "@/auth/create-account/create-account-page";
import { LoginPage } from "@/auth/login/login-page";
import { NotProtectedRoute } from "@/components/routes/not-protected-route";
import { ProtectedRoute } from "@/components/routes/protected-route";
import { CounterIdPage } from "@/counters/:counterId/counter-id-page";
import { EditCounterPage } from "@/counters/:counterId/edit/edit-counter-page";
import { CounterPage } from "@/counters/counter-page";
import { CreateCounterPage } from "@/counters/create/create-counter-page";
import { HomeLayout } from "@/home/home-layout";
import { HomePage } from "@/home/home-page";
import { LandingPage } from "@/landing/landing-page";
import { MembersPage } from "@/members/members-page";
import { RetroIdPage } from "@/retros/:retroId/retro-id-page";
import { CreateRetroPage } from "@/retros/create/create-retro-page";
import { RetrosPage } from "@/retros/retros-page";
import { TeamIdPage } from "@/teams/:teamId/team-id-page";
import { CreateTeamPage } from "@/teams/create/create-team-page";
import { JoinTeamPage } from "@/teams/join/join-team-page";
import { TeamsPage } from "@/teams/teams-page";
import { createBrowserRouter } from "react-router";
import { RequestResetPage } from "./auth/request-reset/request-reset-page";
import { ResetUserPage } from "./auth/reset-user/reset-user-page";
import { EditRetroPage } from "./retros/:retroId/edit/retro-edit-page";
import { EditTeamPage } from "./teams/:teamId/edit/edit-team-page";
import { UserPage } from "./user/user-page";

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
    path: "/request-reset",
    element: (
      <NotProtectedRoute>
        <RequestResetPage />
      </NotProtectedRoute>
    ),
  },
  {
    path: "/reset-user",
    element: (
      <NotProtectedRoute>
        <ResetUserPage />
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
                element: <EditTeamPage />,
              },
              {
                path: "retrospectives",
                children: [
                  { index: true, element: <RetrosPage /> },
                  { path: "create", element: <CreateRetroPage /> },
                  {
                    path: ":retroId",
                    children: [
                      { index: true, element: <RetroIdPage /> },
                      { path: "edit", element: <EditRetroPage /> },
                    ],
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
                element: <MembersPage />,
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
      {
        path: "/user",
        element: <UserPage />,
      },
    ],
  },
]);
