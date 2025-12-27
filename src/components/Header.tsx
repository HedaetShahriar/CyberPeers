// import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { Badge } from "./ui/badge";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

const Header = () => {
//   const { user } = useAuth();
const {user, isLoading} = useUser();
  const { state, isMobile } = useSidebar();

  const desktopLeft =
    state === "collapsed"
      ? "var(--sidebar-width-icon)"
      : "var(--sidebar-width)";

  return (
    <header
      className="fixed top-0 right-0 z-30 bg-background border-b border-border h-16 flex items-center"
      style={{ left: isMobile ? 0 : desktopLeft }}
    >
      <div className="px-6 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="border border-input bg-background hover:bg-accent" />
            <span className="text-sm text-muted-foreground">
              Welcome back,{" "}
              <span className="font-medium text-foreground">{isLoading ? "Loading..." : user?.name}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs capitalize">
              { isLoading ? "Loading..." : user?.role}
            </Badge>
            <Badge variant="secondary" className="text-xs capitalize">
              {isLoading ? "Loading..." : user?.status}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
