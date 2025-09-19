import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Lock, 
  Mail, 
  ArrowLeft,
  Save,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsPageProps {
  onBack: () => void;
  onLogout: () => void;
  userRole: "student" | "faculty" | "admin";
}

export default function SettingsPage({ onBack, onLogout, userRole }: SettingsPageProps) {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@stmarys.edu",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileSave = () => {
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    // In a real app, this would toggle the actual theme
    document.documentElement.classList.toggle('dark', checked);
    toast({
      title: checked ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: `Switched to ${checked ? 'dark' : 'light'} mode`,
    });
  };

  const getRoleColor = () => {
    switch (userRole) {
      case "admin": return "bg-destructive/20 text-destructive border-destructive/20";
      case "faculty": return "bg-warning/20 text-warning border-warning/20";
      case "student": return "bg-primary/20 text-primary border-primary/20";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg text-white p-4 mobile-safe-area">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 p-2"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-semibold text-white">Settings</h1>
                <p className="text-white/80 text-sm">Manage your preferences</p>
              </div>
            </div>
          </div>
          <Badge className={getRoleColor()}>
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="p-4 -mt-4 space-y-6">
        {/* Profile Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                placeholder="Enter your email"
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Change Password
              </h4>
              
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={profileData.currentPassword}
                  onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                  placeholder="Enter current password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                  placeholder="Enter new password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={profileData.confirmPassword}
                  onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <Button onClick={handleProfileSave} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Profile Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose how you want to be notified about updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">All Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Master toggle for all notification types
                </p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            <Separator />

            <div className="space-y-4 opacity-75" style={{ opacity: notificationsEnabled ? 1 : 0.5 }}>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications && notificationsEnabled}
                  onCheckedChange={setEmailNotifications}
                  disabled={!notificationsEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive instant push notifications
                  </p>
                </div>
                <Switch
                  checked={pushNotifications && notificationsEnabled}
                  onCheckedChange={setPushNotifications}
                  disabled={!notificationsEnabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDarkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
              Theme Preference
            </CardTitle>
            <CardDescription>
              Choose your preferred color scheme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium flex items-center gap-2">
                  {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {isDarkMode ? "Use dark theme for better nighttime viewing" : "Use light theme for better daytime viewing"}
                </p>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={handleThemeToggle}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Logout */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security & Account
            </CardTitle>
            <CardDescription>
              Account security and session management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Account Status</span>
                <Badge className="bg-success/20 text-success border-success/20">
                  Active
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Your account is secure and all systems are operational
              </p>
            </div>

            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={onLogout}
            >
              <Shield className="w-4 h-4 mr-2" />
              Logout from Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}