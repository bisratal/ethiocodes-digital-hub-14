import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Demo auth — replace with real auth when backend is connected
const DEMO_PASSWORD = "admin123";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_demo_auth") === "true";
  });
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DEMO_PASSWORD) {
      sessionStorage.setItem("admin_demo_auth", "true");
      setIsAuthenticated(true);
      toast.success("Welcome to the Admin Panel");
    } else {
      toast.error("Invalid password. Try: admin123");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-sm">
          <div className="bg-card rounded-2xl border border-border shadow-elevated p-8 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground mb-1">Admin Access</h1>
            <p className="text-sm text-muted-foreground mb-6">
              This area is restricted. Enter the admin password to continue.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
              <Button type="submit" className="w-full h-11 font-semibold">
                <Shield className="h-4 w-4 mr-2" />
                Unlock Admin Panel
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              Demo password: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">admin123</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
