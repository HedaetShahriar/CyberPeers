import { Activity, Calendar, Clock, Mail, Shield, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

type ActivityItem = {
  action: string;
  timestamp: number;
};

export const UserDashboard = () => {
  const { user: AuthUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: user } = useQuery({
    queryKey: ["user", AuthUser?.email],
    enabled: !loading && !!AuthUser?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user?email=${encodeURIComponent(AuthUser?.email || "")}`
      );
      return data;
    },
  });

  const { data: activities, isLoading: activityLoading } = useQuery({
    queryKey: ["activities", AuthUser?.email],
    enabled: !loading && !!AuthUser?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user/activities?email=${encodeURIComponent(AuthUser?.email || "")}`
      );
      return data;
    },
  });

  const initials = (user?.name || "User").slice(0, 1).toUpperCase();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="border border-border shadow-none">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="mt-1 text-xl font-semibold text-foreground capitalize">
                  {user?.role ?? "user"}
                </p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <Shield className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-none">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="mt-1 text-xl font-semibold text-foreground capitalize">
                  {user?.status ?? "active"}
                </p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-none">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Days active</p>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  {user?.daysActive ?? "—"}
                </p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-none">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">User ID</p>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  #{user?._id.slice(0, 4) ?? "—"}
                </p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="border border-border shadow-none lg:col-span-1">
          <CardHeader className="py-4">
            <CardTitle className="text-base font-semibold text-foreground">
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 border border-border">
                <AvatarFallback className="bg-primary text-primary-foreground text-base font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {user?.name ?? "User"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user?.email ?? "—"}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-[11px] leading-none text-muted-foreground">
                    Email
                  </p>
                  <p className="truncate text-sm text-foreground">
                    {user?.email ?? "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-[11px] leading-none text-muted-foreground">
                    Role
                  </p>
                  <p className="text-sm font-medium text-foreground capitalize">
                    {user?.role ?? "user"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-[11px] leading-none text-muted-foreground">
                    Member since
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(user?.createdAt ?? "").toLocaleDateString() ??
                      "__"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-none lg:col-span-2">
          <CardHeader className="py-4">
            <CardTitle className="text-base font-semibold text-foreground">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <div className="space-y-3">
              {activityLoading ? (
                <p className="text-sm text-muted-foreground">
                  Loading activities...
                </p>
              ) : activities.length > 0 ? (
                activities?.map((activity: ActivityItem, index: number) => {
                  const Icon = activity.action.toLowerCase().includes("login")
                    ? User
                    : activity.action.toLowerCase().includes("update")
                    ? Activity
                    : Calendar;

                  return (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        {index !== activities.length - 1 ? (
                          <div className="mt-2 w-px flex-1 bg-border" />
                        ) : null}
                      </div>

                      <div className="flex-1 rounded-md border border-border bg-card px-3 py-2">
                        <p className="text-sm font-medium text-foreground">
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp === 0 ? "Today": `${activity.timestamp} days ago`} 
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                  No recent activities.
                </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
