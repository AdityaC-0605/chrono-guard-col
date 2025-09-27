import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Camera, CheckCircle, XCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  geoValidated: boolean;
  faceValidated: boolean;
  timestamp: string;
}

interface StudentValidationViewProps {
  onBack: () => void;
}

export default function StudentValidationView({ onBack }: StudentValidationViewProps) {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { toast } = useToast();

  // Sample students with Punjabi names
  const students: Student[] = [
    {
      id: 1,
      name: "Jaspreet Singh",
      rollNumber: "CS-2024-001",
      geoValidated: true,
      faceValidated: true,
      timestamp: "10:32 AM"
    },
    {
      id: 2,
      name: "Simran Kaur",
      rollNumber: "CS-2024-002",
      geoValidated: true,
      faceValidated: false,
      timestamp: "10:33 AM"
    },
    {
      id: 3,
      name: "Harpreet Singh",
      rollNumber: "CS-2024-003",
      geoValidated: false,
      faceValidated: true,
      timestamp: "10:35 AM"
    },
    {
      id: 4,
      name: "Manpreet Kaur",
      rollNumber: "CS-2024-004",
      geoValidated: true,
      faceValidated: true,
      timestamp: "10:36 AM"
    },
    {
      id: 5,
      name: "Gurpreet Singh",
      rollNumber: "CS-2024-005",
      geoValidated: true,
      faceValidated: false,
      timestamp: "10:38 AM"
    },
    {
      id: 6,
      name: "Amrit Kaur",
      rollNumber: "CS-2024-006",
      geoValidated: false,
      faceValidated: false,
      timestamp: "10:40 AM"
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedStudents(students.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleStudentSelect = (studentId: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
      setSelectAll(false);
    }
  };

  const handleSave = () => {
    toast({
      title: "Attendance Saved",
      description: `Validated attendance for ${selectedStudents.length} students`,
    });
    onBack();
  };

  const getValidationStatus = (student: Student) => {
    if (student.geoValidated && student.faceValidated) return "validated";
    if (student.geoValidated || student.faceValidated) return "partial";
    return "pending";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg text-white p-4 mobile-safe-area">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 -ml-2"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Student Validation</h1>
            <p className="text-white/80 text-sm">Computer Science - CS301</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card p-3 text-center">
            <div className="text-lg font-bold">{students.length}</div>
            <div className="text-white/80 text-xs">Total Present</div>
          </div>
          <div className="glass-card p-3 text-center">
            <div className="text-lg font-bold">{students.filter(s => s.geoValidated && s.faceValidated).length}</div>
            <div className="text-white/80 text-xs">Fully Validated</div>
          </div>
          <div className="glass-card p-3 text-center">
            <div className="text-lg font-bold">{students.filter(s => !s.geoValidated || !s.faceValidated).length}</div>
            <div className="text-white/80 text-xs">Needs Review</div>
          </div>
        </div>
      </div>

      <div className="p-4 -mt-4">
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Student Attendance</CardTitle>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="select-all"
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium">
                  Select All
                </label>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {students.map((student) => {
              const status = getValidationStatus(student);
              return (
                <div
                  key={student.id}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedStudents.includes(student.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => 
                        handleStudentSelect(student.id, checked as boolean)
                      }
                    />
                    
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              status === "validated"
                                ? "bg-success/20 text-success border-success/20"
                                : status === "partial"
                                ? "bg-warning/20 text-warning border-warning/20"
                                : "bg-destructive/20 text-destructive border-destructive/20"
                            }
                          >
                            {status === "validated" ? "Validated" : status === "partial" ? "Partial" : "Pending"}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{student.timestamp}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {student.geoValidated ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : (
                            <XCircle className="w-4 h-4 text-destructive" />
                          )}
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="text-xs">Geo-location</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {student.faceValidated ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : (
                            <XCircle className="w-4 h-4 text-destructive" />
                          )}
                          <div className="flex items-center gap-1">
                            <Camera className="w-3 h-3" />
                            <span className="text-xs">Face Recognition</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="flex-1 bg-primary text-primary-foreground"
            disabled={selectedStudents.length === 0}
          >
            Save Attendance ({selectedStudents.length})
          </Button>
        </div>
      </div>
    </div>
  );
}