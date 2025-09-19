import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OTPCheckinProps {
  onBack: () => void;
}

export default function OTPCheckin({ onBack }: OTPCheckinProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [currentOTP] = useState("123456"); // Demo OTP
  const { toast } = useToast();

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && status === "idle") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setStatus("error");
      toast({
        title: "OTP Expired",
        description: "Please request a new OTP from your faculty",
        variant: "destructive",
      });
    }
  }, [timeLeft, status, toast]);

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== "") && newOtp.join("").length === 6) {
      handleSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (otpValue = otp.join("")) => {
    setIsSubmitting(true);
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (otpValue === currentOTP) {
      setStatus("success");
      toast({
        title: "Attendance Marked!",
        description: "Your presence has been recorded successfully",
      });
      setTimeout(() => onBack(), 2000);
    } else {
      setStatus("error");
      toast({
        title: "Invalid OTP",
        description: "Please check the OTP and try again",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const getProgressPercentage = () => {
    return (timeLeft / 30) * 100;
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-mobile shadow-elevated">
          <CardContent className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-success/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-xl font-bold text-success mb-2">Attendance Recorded!</h2>
            <p className="text-muted-foreground mb-4">
              Your presence has been successfully logged for Computer Science class
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span>10:45 AM</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Room 203, CS Building</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-xl font-semibold">Mark Attendance</h1>
        </div>

        {/* Class Info */}
        <div className="glass-card p-4">
          <h2 className="font-semibold mb-2">Computer Science - CS301</h2>
          <div className="flex items-center justify-between text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>10:30 AM - 11:30 AM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Room 203</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 -mt-4">
        <Card className="shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle>Enter OTP</CardTitle>
            <CardDescription>
              Enter the 6-digit code provided by your faculty
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timer */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary stroke-current"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${getProgressPercentage()}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{timeLeft}s</span>
                </div>
              </div>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otp-input"
                  disabled={status !== "idle" || timeLeft === 0}
                />
              ))}
            </div>

            {/* Demo OTP Helper */}
            <div className="text-center p-3 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Demo OTP:</p>
              <p className="font-mono text-lg font-bold text-primary">123456</p>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full btn-mobile gradient-bg text-white"
              onClick={() => handleSubmit()}
              disabled={otp.some(digit => !digit) || isSubmitting || status !== "idle"}
            >
              {isSubmitting ? "Verifying..." : "Submit OTP"}
            </Button>

            {/* Location Status */}
            <div className="flex items-center justify-center gap-2 text-sm text-success">
              <MapPin className="w-4 h-4" />
              <span>Location verified ✓</span>
            </div>

            {/* Error State */}
            {status === "error" && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-xl text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">
                  {timeLeft === 0 ? "OTP expired. Please get a new one." : "Invalid OTP. Please try again."}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}