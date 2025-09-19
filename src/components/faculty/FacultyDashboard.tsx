import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText,
  Bell,
  User,
  QrCode,
  Download,
  X,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FacultyDashboardProps {
  onLogout: () => void;
}

export default function FacultyDashboard({ onLogout }: FacultyDashboardProps) {
  const [currentOTP] = useState("123456");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const { toast } = useToast();

  const classes = [
    { 
      id: 1,
      name: "Computer Science - CS301", 
      time: "10:30 AM", 
      room: "203",
      students: 45,
      present: 38,
      percentage: 84
    },
    { 
      id: 2,
      name: "Data Structures - CS201", 
      time: "2:00 PM", 
      room: "105",
      students: 52,
      present: 41,
      percentage: 79
    },
  ];

  const atRiskStudents = [
    { name: "John Smith", id: "CS-2024-001", percentage: 68, subjects: ["Physics", "Math"] },
    { name: "Sarah Johnson", id: "CS-2024-015", percentage: 72, subjects: ["Computer Science"] },
    { name: "Mike Wilson", id: "CS-2024-032", percentage: 65, subjects: ["Physics", "Math", "English"] },
  ];

  const absenceRequests = [
    { 
      id: 1,
      student: "Emma Davis", 
      studentId: "CS-2024-008",
      subject: "Computer Science",
      date: "2024-01-15",
      reason: "Medical appointment",
      proof: "medical_certificate.pdf",
      status: "pending"
    },
    { 
      id: 2,
      student: "Alex Brown", 
      studentId: "CS-2024-022",
      subject: "Mathematics",
      date: "2024-01-14",
      reason: "Family emergency",
      proof: "family_letter.jpg",
      status: "pending"
    },
  ];

  const generateOTP = () => {
    setOtpGenerated(true);
    toast({
      title: "OTP Generated",
      description: `New OTP: ${currentOTP} (Valid for 30 seconds)`,
    });
  };

  const handleRequest = (requestId: number, action: "approve" | "reject") => {
    toast({
      title: action === "approve" ? "Request Approved" : "Request Rejected",
      description: `Absence request has been ${action}d successfully`,
    });
  };

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
              <h1 className="font-semibold">Dr. Jane Peterson</h1>
              <p className="text-white/80 text-sm">Computer Science Faculty</p>
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
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card p-3 text-center">
            <div className="text-lg font-bold">97</div>
            <div className="text-white/80 text-xs">Total Students</div>
          </div>
          <div className="glass-card p-3 text-center">
            <div className="text-lg font-bold">3</div>
            <div className="text-white/80 text-xs">At Risk</div>
          </div>
          <div className="glass-card p-3 text-center">
            <div className="text-lg font-bold">82%</div>
            <div className="text-white/80 text-xs">Avg Attendance</div>
          </div>
        </div>
      </div>

      <div className="p-4 -mt-4">
        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="students">At Risk</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-4">
            {/* OTP Generation */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  Attendance Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!otpGenerated ? (
                  <Button 
                    className="w-full gradient-bg text-white border-0"
                    onClick={generateOTP}
                  >
                    Generate OTP for Current Class
                  </Button>
                ) : (
                  <div className="text-center p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Current OTP</p>
                    <p className="text-3xl font-bold text-primary font-mono">{currentOTP}</p>
                    <p className="text-xs text-muted-foreground mt-2">Expires in 25 seconds</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Today's Classes */}
            <div className="space-y-3">
              <h3 className="font-semibold">Today's Classes</h3>
              {classes.map((classItem) => (
                <Card key={classItem.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{classItem.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {classItem.time} • Room {classItem.room}
                        </p>
                      </div>
                      <Badge 
                        className={classItem.percentage >= 80 ? 
                          "bg-success/20 text-success border-success/20" : 
                          "bg-warning/20 text-warning border-warning/20"
                        }
                      >
                        {classItem.percentage}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Attendance</span>
                        <span>{classItem.present}/{classItem.students} students</span>
                      </div>
                      <Progress value={classItem.percentage} className="h-2" />
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Students Below 75% Attendance</h3>
              {atRiskStudents.map((student, index) => (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.id}</p>
                      </div>
                      <Badge className="bg-destructive/20 text-destructive border-destructive/20">
                        {student.percentage}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={student.percentage} className="h-2" />
                      <div className="text-sm text-muted-foreground">
                        Risk subjects: {student.subjects.join(", ")}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Send Alert
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Pending Absence Requests</h3>
              {absenceRequests.map((request) => (
                <Card key={request.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{request.student}</h4>
                          <p className="text-sm text-muted-foreground">{request.studentId}</p>
                        </div>
                        <Badge className="bg-warning/20 text-warning border-warning/20">
                          Pending
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Subject:</span> {request.subject}</p>
                        <p><span className="font-medium">Date:</span> {request.date}</p>
                        <p><span className="font-medium">Reason:</span> {request.reason}</p>
                        <p className="text-primary cursor-pointer hover:underline">
                          📎 {request.proof}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-success text-success hover:bg-success/10"
                          onClick={() => handleRequest(request.id, "approve")}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                          onClick={() => handleRequest(request.id, "reject")}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}