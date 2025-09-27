import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, CheckCircle, AlertCircle, User } from "lucide-react";

interface ClassItem {
  id: number;
  subject: string;
  teacher: string;
  time: string;
  endTime: string;
  room: string;
  attended: boolean;
  isActive: boolean;
}

interface ClassScheduleProps {
  selectedDate: Date;
  onMarkAttendance: (classId: number) => void;
}

export default function ClassSchedule({ selectedDate, onMarkAttendance }: ClassScheduleProps) {
  // Sample classes with Punjabi names
  const classes: ClassItem[] = [
    {
      id: 1,
      subject: "Computer Science",
      teacher: "Prof. Harpreet Singh",
      time: "9:00 AM",
      endTime: "10:00 AM",
      room: "CS-101",
      attended: true,
      isActive: false
    },
    {
      id: 2,
      subject: "Mathematics",
      teacher: "Dr. Simranpreet Kaur",
      time: "10:30 AM",
      endTime: "11:30 AM",
      room: "Math-205",
      attended: false,
      isActive: true
    },
    {
      id: 3,
      subject: "Physics",
      teacher: "Prof. Jasbir Singh",
      time: "12:00 PM",
      endTime: "1:00 PM",
      room: "Phy-303",
      attended: false,
      isActive: false
    },
    {
      id: 4,
      subject: "English",
      teacher: "Ms. Manpreet Kaur",
      time: "2:00 PM",
      endTime: "3:00 PM",
      room: "Eng-102",
      attended: true,
      isActive: false
    },
    {
      id: 5,
      subject: "Data Structures",
      teacher: "Dr. Gurpreet Singh",
      time: "3:30 PM",
      endTime: "4:30 PM",
      room: "CS-204",
      attended: false,
      isActive: false
    }
  ];

  const formatDateString = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Classes for {formatDateString(selectedDate)}</h3>
        <Badge variant="secondary">{classes.length} classes</Badge>
      </div>

      <div className="space-y-3">
        {classes.map((classItem) => (
          <Card 
            key={classItem.id} 
            className={`shadow-card transition-all ${
              classItem.isActive ? 'ring-2 ring-primary ring-offset-2 bg-primary/5' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{classItem.subject}</h4>
                    {classItem.attended ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : classItem.isActive ? (
                      <AlertCircle className="w-4 h-4 text-warning animate-pulse" />
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <User className="w-3 h-3" />
                    <span>{classItem.teacher}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{classItem.time} - {classItem.endTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{classItem.room}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  {classItem.attended ? (
                    <Badge className="bg-success/20 text-success border-success/20">
                      Present
                    </Badge>
                  ) : classItem.isActive ? (
                    <Button 
                      size="sm" 
                      onClick={() => onMarkAttendance(classItem.id)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Mark Attendance
                    </Button>
                  ) : (
                    <Badge variant="secondary">
                      Upcoming
                    </Badge>
                  )}
                </div>
              </div>
              
              {classItem.isActive && (
                <div className="mt-3 p-2 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-xs text-warning font-medium">
                    Class is currently active - Mark your attendance now!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}