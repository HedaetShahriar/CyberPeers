import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Users, UserCheck, UserX, Activity, User, Calendar } from "lucide-react";
import { Separator } from "../components/ui/separator";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

type ActivityItem = {
  action: string;
  timestamp: number;
};

export const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/admin/stats?email=${encodeURIComponent(user?.email || "")}`
      );
      return data;
    },
  });

  const statCards = [
    {
      title: "Total Users",
      value: isLoading ? 0 : data.totalUsers,
      icon: Users,
    },
    {
      title: "Active Users",
      value: isLoading ? 0 : data.activeUsers,
      icon: UserCheck,
    },
    {
      title: "Suspended Users",
      value: isLoading ? 0 : data.suspendedUsers,
      icon: UserX,
    },
    {
      title: "New This Week",
      value: isLoading ? 0 : data.recentActivities,
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Monitor and manage your platform users
        </p>
      </div>

      {/* Stats + Quick Actions (same row on desktop) */}
      <div className="flex gap-4 flex-col lg:flex-row lg:justify-between">
        {/* Stats Grid */}
        <div className="grid lg:w-3/4 grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border border-border">
                <CardHeader className=" flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xs font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="p-1.5 bg-muted rounded-md">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">Total count</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="p-4 bg-background border border-border rounded-lg">
          <h2 className="text-base font-semibold">Quick Actions</h2>
          <Separator className="my-3" />
          <div className="flex flex-col md:flex-row gap-3">
            <button className="w-full p-3 border border-border rounded-lg hover:bg-accent text-left transition-colors">
              <h3 className="font-semibold text-sm text-foreground">
                View All Users
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage user accounts and permissions
              </p>
            </button>
            <button className="w-full p-3 border border-border rounded-lg hover:bg-accent text-left transition-colors">
              <h3 className="font-semibold text-sm text-foreground">
                Activity Log
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                View recent platform activity
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border border-border">
        <CardHeader className=" border-b">
          <CardTitle className="text-base font-semibold">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">
              Loading recent activities...
            </p>
          ) : data.activities.length > 0 ? (
            data?.activities.map((activity: ActivityItem) => {
              const Icon = activity.action.toLowerCase().includes("logged")
                    ? User
                    : activity.action.toLowerCase().includes("account")
                    ? UserCheck
                    : activity.action.toLowerCase().includes("suspended")
                    ? UserX
                    : activity.action.toLowerCase().includes("role")
                    ? Activity
                    : Calendar;
              return (
                <div className="mb-3 last:mb-0" key={activity.timestamp}>
                  <div className="flex items-center gap-3 p-3 border-l-2 border-primary bg-muted/40 rounded-lg">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground">
                        {activity.action}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {activity.timestamp === 0 ? "Today": `${activity.timestamp} days ago`}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">
              No recent activities.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
