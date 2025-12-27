import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, User, Shield, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const AppSidebar = () => {
  const { logOut } = useAuth();
  const {user, isLoading} = useUser();
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  const adminNavItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/users", label: "Users", icon: Users },
  ];

  const userNavItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const navItems = isLoading ? [] : user?.role === "admin" ? adminNavItems : userNavItems;

  const handleLogout = () => {
    logOut();
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="h-16 border-b border-border flex items-center">
        <div className="flex items-center py-1.5 pl-1 gap-3 w-full">
          <div className="h-9 w-9 bg-primary rounded-md flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-sm font-semibold text-foreground truncate">
              CyberPeers
            </h1>
            <p className="text-[11px] text-muted-foreground truncate">
              {isLoading ? "Loading..." : user?.role === "admin" ? "Admin Panel" : "User Portal"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="ml-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.path)}
                      tooltip={item.label}
                    >
                      <Link to={item.path}>
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className={`border-t border-border ${isCollapsed ? "p-2" : "p-4"}`}
      >
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                {isLoading ? " " : user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-3 p-3 bg-muted rounded-lg">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                  {isLoading ? " " : user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {isLoading ? "Loading..." : user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {isLoading ? "Loading..." : user?.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="text-sm">Logout</span>
            </Button>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
