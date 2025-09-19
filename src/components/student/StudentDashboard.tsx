import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  QrCode,
  Upload,
  Bell
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg text-white p-4 mobile-safe-area">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-semibold">John Smith</h1>
              <p className="text-white/80 text-sm">CS-2024-001</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold">{attendancePercentage}%</div>
            <div className="text-white/80 text-sm">Attendance</div>
          </div>
          <div className="glass-card p-4 text-center">
            <Badge className={`${getRiskColor(riskScore)} text-xs`}>
              {riskScore} Risk
            </Badge>
            <div className="text-white/80 text-sm mt-1">Status</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        {/* Attendance Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Overall Progress</span>
                <span className="font-semibold">{attendancePercentage}%</span>
              </div>
              <Progress value={attendancePercentage} className="h-3" />
              
              {attendancePercentage < 75 && (
                <div className="flex items-center gap-2 p-3 bg-warning/10 rounded-xl border border-warning/20">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-sm">
                    You need <strong>{deficitClasses} more classes</strong> to reach 75% eligibility
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Subject-wise Attendance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{subject.name}</span>
                    <Badge className={getStatusColor(subject.status)}>
                      {subject.percentage}%
                    </Badge>
                  </div>
                  <Progress value={subject.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Chart */}
        <AttendanceChart />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="h-20 flex flex-col gap-2 gradient-bg text-white border-0"
            onClick={() => setShowOTP(true)}
          >
            <QrCode className="w-6 h-6" />
            <span className="text-sm">Mark Attendance</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 border-2"
          >
            <Upload className="w-6 h-6" />
            <span className="text-sm">Upload Proof</span>
          </Button>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { subject: "Computer Science", time: "10:30 AM", status: "present" },
                { subject: "Mathematics", time: "Yesterday", status: "absent" },
                { subject: "Physics", time: "Yesterday", status: "present" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div>
                    <div className="font-medium text-sm">{activity.subject}</div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                  {activity.status === "present" ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}