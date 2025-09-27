import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeeklyCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function WeeklyCalendar({ selectedDate, onDateSelect }: WeeklyCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekDates = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day;
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startDate);
      weekDate.setDate(startDate.getDate() + i);
      week.push(weekDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);
  const today = new Date();

  const formatDate = (date: Date) => {
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
      isSelected: date.toDateString() === selectedDate.toDateString()
    };
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Weekly Schedule</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigateWeek('next')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {weekDates.map((date, index) => {
          const { day, date: dateNum, isToday, isSelected } = formatDate(date);
          return (
            <Button
              key={index}
              variant={isSelected ? "default" : "ghost"}
              size="sm"
              onClick={() => onDateSelect(date)}
              className={`flex-shrink-0 flex flex-col gap-1 h-16 w-16 ${
                isToday ? 'ring-2 ring-primary ring-offset-2' : ''
              } ${isSelected ? 'bg-primary text-primary-foreground' : ''}`}
            >
              <span className="text-xs">{day}</span>
              <span className="text-lg font-bold">{dateNum}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}