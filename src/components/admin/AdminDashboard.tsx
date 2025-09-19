import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  Calendar,
  Shield,
  Bell,
  User,
  Building,
  Clock
} from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

const monthlyData = [
  { month: "Jan", attendance: 85, target: 75 },
  { month: "Feb", attendance: 88, target: 75 },
  { month: "Mar", attendance: 82, target: 75 },
  { month: "Apr", attendance: 89, target: 75 },
  { month: "May", attendance: 91, target: 75 },
];

const departmentData = [
  { name: "Computer Science", students: 450, attendance: 88, color: "hsl(262, 83%, 58%)" },
  { name: "Mathematics", students: 320, attendance: 85, color: "hsl(142, 71%, 45%)" },
  { name: "Physics", students: 280, attendance: 79, color: "hsl(38, 92%, 50%)" },
  { name: "Chemistry", students: 195, attendance: 82, color: "hsl(200, 98%, 39%)" },
];

const alertData = [
  { type: "Critical", count: 23, description: "Students below 60% attendance" },
  { type: "Warning", count: 56, description: "Students below 75% attendance" },
  { type: "Info", count: 12, description: "Missing faculty reports" },
];

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const overallAttendance = 86;
  const totalStudents = 1245;
  const atRiskStudents = 79;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg text-white p-4 mobile-safe-area">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-semibold">Admin Dashboard</h1>
              <p className="text-white/80 text-sm">St. Mary's College</p>
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

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-white">{overallAttendance}%</div>
            <div className="text-white/80 text-xs">Overall Attendance</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-white">{totalStudents}</div>
            <div className="text-white/80 text-xs">Total Students</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-white">{atRiskStudents}</div>
            <div className="text-white/80 text-xs">At Risk</div>
          </div>
        </div>
      </div>

      <div className="p-4 -mt-4">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Attendance Overview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Institution Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Overall Attendance</span>
                    <span className="font-semibold">{overallAttendance}%</span>
                  </div>
                  <Progress value={overallAttendance} className="h-3" />
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-success/10 rounded-xl">
                      <div className="text-2xl font-bold text-success">{totalStudents - atRiskStudents}</div>
                      <div className="text-sm text-success">On Track</div>
                    </div>
                    <div className="text-center p-3 bg-warning/10 rounded-xl">
                      <div className="text-2xl font-bold text-warning">{atRiskStudents}</div>
                      <div className="text-sm text-warning">Need Support</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Performance */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Department Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-sm">{dept.name}</span>
                          <p className="text-xs text-muted-foreground">{dept.students} students</p>
                        </div>
                        <Badge className={
                          dept.attendance >= 85 ? 
                          "bg-success/20 text-success border-success/20" :
                          dept.attendance >= 75 ?
                          "bg-warning/20 text-warning border-warning/20" :
                          "bg-destructive/20 text-destructive border-destructive/20"
                        }>
                          {dept.attendance}%
                        </Badge>
                      </div>
                      <Progress value={dept.attendance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertData.map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl border">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          alert.type === "Critical" ? "bg-destructive" :
                          alert.type === "Warning" ? "bg-warning" : "bg-primary"
                        }`} />
                        <div>
                          <div className="font-medium text-sm">{alert.description}</div>
                          <div className="text-xs text-muted-foreground">{alert.type}</div>
                        </div>
                      </div>
                      <Badge variant="secondary">{alert.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            {/* Attendance Trends */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Monthly Attendance Trends</CardTitle>
                <CardDescription>Institution-wide attendance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <XAxis 
                        dataKey="month" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={[60, 100]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="attendance" 
                        stroke="hsl(262, 83%, 58%)" 
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="hsl(0, 85%, 60%)" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Department Distribution */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Student enrollment by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="w-32 h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={departmentData}
                          dataKey="students"
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                        >
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 ml-6 space-y-2">
                    {departmentData.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm">{entry.name}</span>
                        </div>
                        <span className="font-semibold text-sm">{entry.students}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  Generate Reports
                </CardTitle>
                <CardDescription>Export attendance and analytics data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="flex items-center justify-between h-14">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Monthly Attendance Report</div>
                        <div className="text-sm text-muted-foreground">Detailed monthly breakdown</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4" />
                  </Button>

                  <Button variant="outline" className="flex items-center justify-between h-14">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Student Performance Report</div>
                        <div className="text-sm text-muted-foreground">Individual student records</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4" />
                  </Button>

                  <Button variant="outline" className="flex items-center justify-between h-14">
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Department Analytics</div>
                        <div className="text-sm text-muted-foreground">Department-wise insights</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4" />
                  </Button>

                  <Button variant="outline" className="flex items-center justify-between h-14">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">At-Risk Students Report</div>
                        <div className="text-sm text-muted-foreground">Students needing intervention</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Quick Stats Export</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">CSV Export</Button>
                    <Button variant="outline" size="sm">PDF Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Automated Timetable */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Timetable Management
                </CardTitle>
                <CardDescription>Automated scheduling and conflict resolution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Auto-Scheduler Status</span>
                    <Badge className="bg-success/20 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Next optimization scheduled for tonight at 2:00 AM
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button variant="outline" className="h-12">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Resolve Conflicts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}