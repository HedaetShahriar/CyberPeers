import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AppSidebar from "../components/Sidebar";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 pt-[calc(1.5rem+4rem)]">
            <div className="max-w-7xl mx-auto">{<Outlet />}</div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
