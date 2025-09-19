import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, GraduationCap, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "student" | "faculty" | "admin";

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Demo role detection based on email
    let role: UserRole = "student";
    if (email.includes("faculty") || email.includes("teacher")) {
      role = "faculty";
    } else if (email.includes("admin")) {
      role = "admin";
    }

    toast({
      title: "Login Successful",
      description: `Welcome back! Logged in as ${role}.`,
    });

    setIsLoading(false);
    onLogin(role);
  };

  const quickLogin = (role: UserRole, demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("demo123");
    setTimeout(() => onLogin(role), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4 mobile-safe-area">
      <div className="w-full max-w-mobile space-y-8">
        {/* Logo & Branding */}
        <div className="text-center text-white">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Presence</h1>
          <p className="text-white/80 text-lg">Smart Attendance & Analytics</p>
        </div>

        {/* Login Card */}
        <Card className="glass-card border-0 shadow-elevated">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-mobile gradient-bg border-0 text-white font-semibold hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <Button variant="link" className="text-primary">
                Forgot password?
              </Button>
            </div>

            {/* Quick Demo Access */}
            <div className="space-y-3 pt-4 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">Quick Demo Access</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col gap-1 h-16 text-xs"
                  onClick={() => quickLogin("student", "student@demo.edu")}
                >
                  <GraduationCap className="w-4 h-4" />
                  Student
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col gap-1 h-16 text-xs"
                  onClick={() => quickLogin("faculty", "faculty@demo.edu")}
                >
                  <Users className="w-4 h-4" />
                  Faculty
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col gap-1 h-16 text-xs"
                  onClick={() => quickLogin("admin", "admin@demo.edu")}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}