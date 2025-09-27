import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, MessageSquare, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Faculty {
  id: number;
  name: string;
  subject: string;
  department: string;
  rating: number;
  email: string;
}

export default function FacultyList() {
  const [feedback, setFeedback] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const { toast } = useToast();

  // Sample faculty with Punjabi names
  const faculties: Faculty[] = [
    {
      id: 1,
      name: "Prof. Harpreet Singh",
      subject: "Computer Science",
      department: "CSE",
      rating: 4.8,
      email: "harpreet.singh@college.edu"
    },
    {
      id: 2,
      name: "Dr. Simranpreet Kaur",
      subject: "Mathematics",
      department: "Math",
      rating: 4.6,
      email: "simranpreet.kaur@college.edu"
    },
    {
      id: 3,
      name: "Prof. Jasbir Singh",
      subject: "Physics",
      department: "Physics",
      rating: 4.7,
      email: "jasbir.singh@college.edu"
    },
    {
      id: 4,
      name: "Ms. Manpreet Kaur",
      subject: "English",
      department: "Humanities",
      rating: 4.9,
      email: "manpreet.kaur@college.edu"
    },
    {
      id: 5,
      name: "Dr. Gurpreet Singh",
      subject: "Data Structures",
      department: "CSE",
      rating: 4.5,
      email: "gurpreet.singh@college.edu"
    },
    {
      id: 6,
      name: "Prof. Amrit Kaur",
      subject: "Database Systems",
      department: "CSE",
      rating: 4.8,
      email: "amrit.kaur@college.edu"
    }
  ];

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please enter your feedback",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: `Your feedback for ${selectedFaculty?.name} has been sent successfully`,
    });
    
    setFeedback("");
    setSelectedFaculty(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-500 fill-current' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Faculty Members</h3>
        <Badge variant="secondary">{faculties.length} teachers</Badge>
      </div>

      <div className="grid gap-3">
        {faculties.map((faculty) => (
          <Card key={faculty.id} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{faculty.name}</h4>
                      <p className="text-sm text-muted-foreground">{faculty.subject}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <Badge variant="outline" className="text-xs">
                      {faculty.department}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {renderStars(faculty.rating)}
                      <span className="ml-1 font-medium">{faculty.rating}</span>
                    </div>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedFaculty(faculty)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Feedback
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Feedback</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{selectedFaculty?.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedFaculty?.subject}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Your Feedback</label>
                        <Textarea
                          placeholder="Share your thoughts about the teaching quality, course content, or any suggestions..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows={4}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button onClick={handleSubmitFeedback} className="flex-1">
                          Submit Feedback
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}