import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Users, User, BookOpen, ArrowLeft } from "lucide-react";

interface ClassDetail {
  id: number;
  subject: string;
  teacher: string;
  department: string;
  time: string;
  room: string;
  students: number;
  duration: string;
}

interface TimetableViewProps {
  onBack: () => void;
}

export default function TimetableView({ onBack }: TimetableViewProps) {
  const [selectedClass, setSelectedClass] = useState<ClassDetail | null>(null);

  // Sample timetable data with Punjabi names
  const timetableData: ClassDetail[] = [
    {
      id: 1,
      subject: "Computer Science Fundamentals",
      teacher: "Prof. Harpreet Singh",
      department: "Computer Science",
      time: "9:00 AM - 10:00 AM",
      room: "CS-101",
      students: 45,
      duration: "1 hour"
    },
    {
      id: 2,
      subject: "Advanced Mathematics",
      teacher: "Dr. Simranpreet Kaur",
      department: "Mathematics",
      time: "10:30 AM - 11:30 AM",
      room: "Math-205",
      students: 38,
      duration: "1 hour"
    },
    {
      id: 3,
      subject: "Physics Laboratory",
      teacher: "Prof. Jasbir Singh",
      department: "Physics",
      time: "12:00 PM - 2:00 PM",
      room: "Phy-Lab-1",
      students: 30,
      duration: "2 hours"
    },
    {
      id: 4,
      subject: "English Literature",
      teacher: "Ms. Manpreet Kaur",
      department: "Humanities",
      time: "2:30 PM - 3:30 PM",
      room: "Eng-102",
      students: 42,
      duration: "1 hour"
    },
    {
      id: 5,
      subject: "Data Structures & Algorithms",
      teacher: "Dr. Gurpreet Singh",
      department: "Computer Science",
      time: "3:45 PM - 4:45 PM",
      room: "CS-204",
      students: 35,
      duration: "1 hour"
    },
    {
      id: 6,
      subject: "Chemistry Practical",
      teacher: "Prof. Amrit Kaur",
      department: "Chemistry",
      time: "9:00 AM - 11:00 AM",
      room: "Chem-Lab-2",
      students: 28,
      duration: "2 hours"
    },
    {
      id: 7,
      subject: "Software Engineering",
      teacher: "Dr. Balpreet Singh",
      department: "Computer Science",
      time: "11:30 AM - 12:30 PM",
      room: "CS-301",
      students: 40,
      duration: "1 hour"
    },
    {
      id: 8,
      subject: "Business Communication",
      teacher: "Ms. Jasleen Kaur",
      department: "Management",
      time: "1:00 PM - 2:00 PM",
      room: "Mgmt-201",
      students: 50,
      duration: "1 hour"
    }
  ];

  const departments = [...new Set(timetableData.map(item => item.department))];

  const getClassesByDepartment = (department: string) => {
    return timetableData.filter(item => item.department === department);
  };

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      "Computer Science": "bg-blue-500/10 text-blue-700 border-blue-200",
      "Mathematics": "bg-green-500/10 text-green-700 border-green-200",
      "Physics": "bg-purple-500/10 text-purple-700 border-purple-200",
      "Chemistry": "bg-orange-500/10 text-orange-700 border-orange-200",
      "Humanities": "bg-pink-500/10 text-pink-700 border-pink-200",
      "Management": "bg-yellow-500/10 text-yellow-700 border-yellow-200"
    };
    return colors[department] || "bg-gray-500/10 text-gray-700 border-gray-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Academic Timetable</h2>
          <p className="text-sm text-muted-foreground">Department-wise class schedule</p>
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-6">
          {departments.map((department) => (
            <Card key={department} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{department} Department</span>
                  <Badge variant="secondary">
                    {getClassesByDepartment(department).length} classes
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getClassesByDepartment(department).map((classItem) => (
                    <div
                      key={classItem.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedClass(classItem)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{classItem.subject}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{classItem.teacher}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{classItem.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{classItem.students} students</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={getDepartmentColor(department)}>
                          {classItem.room}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Class Details Modal */}
      <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Class Details</DialogTitle>
          </DialogHeader>
          {selectedClass && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-lg">{selectedClass.subject}</h3>
                <Badge className={getDepartmentColor(selectedClass.department)} variant="outline">
                  {selectedClass.department}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Teacher</p>
                      <p className="font-medium">{selectedClass.teacher}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Students</p>
                      <p className="font-medium">{selectedClass.students} enrolled</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{selectedClass.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Room</p>
                      <p className="font-medium">{selectedClass.room}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-primary font-medium">
                  Duration: {selectedClass.duration}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}