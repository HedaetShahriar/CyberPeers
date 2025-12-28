import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground max-w-md">
            You don't have permission to access this page. Please contact an
            administrator if you believe this is an error.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link to={"-1"}>
            <Button>Go Back</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Sign Out</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
