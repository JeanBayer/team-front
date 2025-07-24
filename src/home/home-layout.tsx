import { BackgroundProvider } from "@/components/backgrounds/background-provider";
import { ThemeBackground } from "@/components/backgrounds/theme-background";
import { AppSidebar } from "@/components/navbar/sidebar";
import { Timer } from "@/components/timer/timer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useReactQuerySubscription } from "@/hooks/use-react-query-subscription";
import { Outlet, useParams } from "react-router";

export const HomeLayout = () => {
  const { teamId } = useParams();
  useReactQuerySubscription(teamId);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen w-full bg-[#f8fafc] relative">
        <div className="w-full flex justify-between pt-4 px-4">
          <SidebarTrigger className="relative z-10" />
          <div className="flex">
            <Timer />
            <ThemeBackground />
          </div>
        </div>
        <BackgroundProvider>
          <div className="relative z-10 p-4 w-full">
            <Outlet />
          </div>
        </BackgroundProvider>
      </main>
    </SidebarProvider>
  );
};
