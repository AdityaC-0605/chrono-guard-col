import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import presenceLogo from "@/assets/presence-logo.png";

type UserRole = "student" | "faculty" | "admin";

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo credentials
    if (email === "student@test.com") {
      onLogin("student");
    } else if (email === "faculty@test.com") {
      onLogin("faculty");
    } else if (email === "admin@test.com") {
      onLogin("admin");
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your email and password",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <div className="w-full max-w-mobile space-y-8">
        {/* Logo Section */}
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto">
            <img 
              src={presenceLogo} 
              alt="Presence Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div>
            <p className="text-muted-foreground text-lg">Sign in to your account</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14 bg-background border-0 rounded-2xl shadow-card text-lg"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 h-14 bg-background border-0 rounded-2xl shadow-card text-lg"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-semibold shadow-card"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-muted-foreground text-sm">OR</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full h-14 bg-background border-0 rounded-2xl shadow-card text-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span>Login with Google</span>
            </div>
          </Button>
        </div>

        {/* Demo Info */}
        <div className="text-center text-xs text-muted-foreground space-y-1 bg-background/50 rounded-xl p-4">
          <p className="font-medium">Demo accounts:</p>
          <p>student@test.com | faculty@test.com | admin@test.com</p>
          <p>Password: any</p>
        </div>
      </div>
    </div>
  );
}