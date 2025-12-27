import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AppSidebar from "../components/Sidebar";
import { SidebarProvider } from "../components/ui/sidebar";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        <Header />
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
