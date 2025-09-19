import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginScreen from "@/components/auth/LoginScreen";
import StudentDashboard from "@/components/student/StudentDashboard";
import FacultyDashboard from "@/components/faculty/FacultyDashboard";
import AdminDashboard from "@/components/admin/AdminDashboard";

type UserRole = "student" | "faculty" | "admin";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ role: UserRole } | null>(null);

  const handleLogin = (role: UserRole) => {
    setUser({ role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderDashboard = () => {
    if (!user) return <LoginScreen onLogin={handleLogin} />;

    switch (user.role) {
      case "student":
        return <StudentDashboard onLogout={handleLogout} />;
      case "faculty":
        return <FacultyDashboard onLogout={handleLogout} />;
      case "admin":
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderDashboard()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
