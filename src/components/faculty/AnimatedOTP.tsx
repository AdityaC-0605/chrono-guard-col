import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnimatedOTPProps {
  onGenerate: () => void;
  onViewDetails: () => void;
}

export default function AnimatedOTP({ onGenerate, onViewDetails }: AnimatedOTPProps) {
  const [otp] = useState("123456");
  const [displayedDigits, setDisplayedDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isGenerating) {
      const digits = otp.split("");
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < digits.length) {
          setDisplayedDigits(prev => {
            const newDigits = [...prev];
            newDigits[currentIndex] = digits[currentIndex];
            return newDigits;
          });
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsGenerating(false);
          setIsActive(true);
          setTimeLeft(15); // 15-second countdown
        }
      }, 1000); // Show one digit per second

      return () => clearInterval(interval);
    }
  }, [isGenerating, otp]);

  useEffect(() => {
    if (timeLeft > 0 && isActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setDisplayedDigits(["", "", "", "", "", ""]);
      toast({
        title: "OTP Expired",
        description: "Please generate a new OTP",
        variant: "destructive",
      });
    }
  }, [timeLeft, isActive, toast]);

  const handleGenerate = () => {
    setDisplayedDigits(["", "", "", "", "", ""]);
    setIsGenerating(true);
    setTimeLeft(0);
    onGenerate();
  };

  const getProgressPercentage = () => {
    return (timeLeft / 15) * 100;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-primary" />
          Attendance OTP
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isActive && !isGenerating ? (
          <Button 
            className="w-full gradient-bg text-white border-0"
            onClick={handleGenerate}
          >
            Generate OTP for Current Class
          </Button>
        ) : (
          <div className="space-y-4">
            {/* OTP Display */}
            <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/20">
              <p className="text-sm text-muted-foreground mb-4">Current OTP</p>
              <div className="flex justify-center gap-2 mb-4">
                {displayedDigits.map((digit, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-2xl font-bold font-mono transition-all duration-300 ${
                      digit 
                        ? 'border-primary bg-primary text-primary-foreground scale-110' 
                        : isGenerating && index === displayedDigits.filter(d => d).length
                        ? 'border-primary bg-primary/20 animate-pulse'
                        : 'border-muted bg-muted/20'
                    }`}
                  >
                    {digit || (isGenerating && index === displayedDigits.filter(d => d).length ? "●" : "")}
                  </div>
                ))}
              </div>
              
              {isActive && (
                <div className="space-y-3">
                  <div className="relative w-16 h-16 mx-auto">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-muted stroke-current"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-primary stroke-current"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={`${getProgressPercentage()}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{timeLeft}s</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    OTP expires in {timeLeft} seconds
                  </p>
                </div>
              )}
              
              {isGenerating && (
                <p className="text-xs text-muted-foreground">
                  Generating digits... {displayedDigits.filter(d => d).length}/6
                </p>
              )}
            </div>

            {isActive && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={onViewDetails}
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleGenerate}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}