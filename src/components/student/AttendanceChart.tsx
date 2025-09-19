import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Calendar } from "lucide-react";

const weeklyData = [
  { day: "Mon", present: 4, absent: 1 },
  { day: "Tue", present: 5, absent: 0 },
  { day: "Wed", present: 3, absent: 2 },
  { day: "Thu", present: 4, absent: 1 },
  { day: "Fri", present: 5, absent: 0 },
];

const pieData = [
  { name: "Present", value: 78, color: "hsl(142, 71%, 45%)" },
  { name: "Absent", value: 22, color: "hsl(0, 85%, 60%)" },
];

export default function AttendanceChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Weekly Analytics
        </CardTitle>
        <CardDescription>Your attendance pattern this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Weekly Bar Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="day" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Bar 
                  dataKey="present" 
                  fill="hsl(142, 71%, 45%)" 
                  radius={[4, 4, 0, 0]}
                  stackId="attendance"
                />
                <Bar 
                  dataKey="absent" 
                  fill="hsl(0, 85%, 60%)" 
                  radius={[4, 4, 0, 0]}
                  stackId="attendance"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance Pie Chart */}
          <div className="flex items-center justify-between">
            <div className="w-24 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={45}
                    startAngle={90}
                    endAngle={450}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 ml-6 space-y-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                  <span className="font-semibold">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}