import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginScreen from "@/components/auth/LoginScreen";
import StudentDashboard from "@/components/student/StudentDashboard";
import FacultyDashboard from "@/components/faculty/FacultyDashboard";
import AdminDashboard from "@/components/admin/AdminDashboard";
import SettingsPage from "@/components/settings/SettingsPage";

type UserRole = "student" | "faculty" | "admin";
type CurrentView = "dashboard" | "settings";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const [currentView, setCurrentView] = useState<CurrentView>("dashboard");

  const handleLogin = (role: UserRole) => {
    setUser({ role });
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("dashboard");
  };

  const handleShowSettings = () => {
    setCurrentView("settings");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const renderContent = () => {
    if (!user) return <LoginScreen onLogin={handleLogin} />;

    if (currentView === "settings") {
      return (
        <SettingsPage 
          onBack={handleBackToDashboard}
          onLogout={handleLogout}
          userRole={user.role}
        />
      );
    }

    switch (user.role) {
      case "student":
        return <StudentDashboard onLogout={handleLogout} onShowSettings={handleShowSettings} />;
      case "faculty":
        return <FacultyDashboard onLogout={handleLogout} onShowSettings={handleShowSettings} />;
      case "admin":
        return <AdminDashboard onLogout={handleLogout} onShowSettings={handleShowSettings} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderContent()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
