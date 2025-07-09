import { AppSidebar } from "@/components/navbar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export const HomeLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
