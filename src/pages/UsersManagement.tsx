import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { UserCog, Shield, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

type userProps = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
};

export const UsersManagement = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users?email=${encodeURIComponent(user?.email || "")}`
      );
      return data;
    },
  });

  const handleRoleChange = async (
    userId: string,
    newRole: "admin" | "user"
  ) => {
    try {
      await axiosSecure.patch(
        `/user/role/${userId}?email=${encodeURIComponent(user?.email || "")}`,
        {
          role: newRole,
        }
      );
      refetch();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "suspended" : "active";
      await axiosSecure.patch(
        `/user/status/${userId}?email=${encodeURIComponent(user?.email || "")}`,
        {
          status: newStatus,
        }
      );
      refetch();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{users.length} Total Users</Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-muted/20 p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Admins</p>
            <p className="text-lg font-bold text-foreground mt-1">
              {isLoading
                ? 0
                : users.filter((u: userProps) => u.role === "admin").length}
            </p>
          </div>
          <div className="p-2 bg-muted rounded-md">
            <Shield className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/20 p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Regular Users
            </p>
            <p className="text-lg font-bold text-foreground mt-1">
              {isLoading
                ? 0
                : users.filter((u: userProps) => u.role === "user").length}
            </p>
          </div>
          <div className="p-2 bg-muted rounded-md">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/20 p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Active Users
            </p>
            <p className="text-lg font-bold text-foreground mt-1">
              {isLoading
                ? 0
                : users.filter((u: userProps) => u.status === "active").length}
            </p>
          </div>
          <div className="p-2 bg-muted rounded-md">
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      {/* Users Table */}
        <div>
          <Table >
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="lg:h-94 overflow-y-scroll">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: userProps, index: number) => (
                  <TableRow key={user?._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {user?.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ID: {index + 1}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>
                      <select
                        value={user?.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user?._id,
                            e.target.value as "admin" | "user"
                          )
                        }
                        className="flex h-9 w-32 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active" ? "default" : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={
                          user.status === "active" ? "destructive" : "default"
                        }
                        onClick={() =>
                          handleStatusToggle(user?._id, user?.status)
                        }
                      >
                        {user?.status === "active" ? "Suspend" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
    </div>
  );
};
