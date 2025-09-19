import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Calendar, 
  Bell,
  Users,
  Settings
} from "lucide-react";
import AttendanceChart from "./AttendanceChart";
import OTPCheckin from "./OTPCheckin";

interface StudentDashboardProps {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [showOTP, setShowOTP] = useState(false);
  const [attendancePercentage] = useState(78);
  const [riskScore] = useState("Medium");
  const [deficitClasses] = useState(5);

  const subjects = [
    { name: "Computer Science", percentage: 85, status: "good" },
    { name: "Mathematics", percentage: 72, status: "warning" },
    { name: "Physics", percentage: 68, status: "danger" },
    { name: "English", percentage: 92, status: "good" },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-success text-success-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "High": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-success/20 text-success border-success/20";
      case "warning": return "bg-warning/20 text-warning border-warning/20";
      case "danger": return "bg-destructive/20 text-destructive border-destructive/20";
      default: return "bg-muted/20 text-muted-foreground border-muted/20";
    }
  };

  if (showOTP) {
    return <OTPCheckin onBack={() => setShowOTP(false)} />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background p-4 mobile-safe-area border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onLogout}>
              ←
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Student Profile</h1>
          </div>
          <Button variant="ghost" size="sm">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <div className="text-center space-y-4">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-card">
            <User className="w-16 h-16 text-amber-800" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Ethan Carter</h2>
            <p className="text-muted-foreground">Student ID: 20230012</p>
            <p className="text-muted-foreground">Grade: 10</p>
          </div>
        </div>

        {/* Attendance Card */}
        <Card className="shadow-card bg-background">
          <CardHeader>
            <CardTitle className="text-xl">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Classes: 150</p>
                  <p className="text-sm text-muted-foreground">Present: 120</p>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={80} className="w-20 h-2" />
                  <span className="text-2xl font-bold text-primary">80%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Score Card */}
        <Card className="shadow-card bg-background">
          <CardHeader>
            <CardTitle className="text-xl">Predictive Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Low Risk</p>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-accent stroke-current"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="20, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">20%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Performance Card */}
        <Card className="shadow-card bg-background">
          <CardHeader>
            <CardTitle className="text-xl">Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Grade</span>
                <span className="font-semibold">A (85%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assignments Completed</span>
                <span className="font-semibold">9/10 (90%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mentoring & Feedback Section */}
        <Card className="shadow-card bg-background">
          <CardHeader>
            <CardTitle className="text-xl">Mentoring & Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Schedule mentoring sessions and view feedback from faculty.</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="flex justify-around items-center max-w-mobile mx-auto">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs">
            <Calendar className="w-5 h-5" />
            <span>Attendance</span>
          </Button>
          <Button className="flex flex-col items-center gap-1 text-xs bg-primary text-white">
            <User className="w-5 h-5" />
            <span>Students</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs">
            <Users className="w-5 h-5" />
            <span>Faculty</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}