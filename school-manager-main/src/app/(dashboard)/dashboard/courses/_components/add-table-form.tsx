"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllHoursBetween } from "@/lib/getHours";
import type { CourseSchema } from "@/lib/validations/course";
import { Time } from "@internationalized/date";

interface AddTableFormProps {
  className?: string;
  onSchedule: (
    dayOfWeek: CourseSchema["classes"][number]["dayOfWeek"],
    timeOfDay: CourseSchema["classes"][number]["timeOfDay"],
    endTimeOfDay: CourseSchema["classes"][number]["endTimeOfDay"],
  ) => void;
}

export const AddTableForm = ({ className, onSchedule }: AddTableFormProps) => {
  const [isOpen, setOpen] = useState(false);

  const [day, setDay] = useState<string>();
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const handleAddSchedule = () => {
    if (!day || !startTime || !endTime) return;

    const dayOfWeek = day as CourseSchema["classes"][number]["dayOfWeek"];
    const timeOfDay = new Time(startTime).toString();
    const endTimeOfDay = new Time(endTime).toString();

    onSchedule(dayOfWeek, timeOfDay, endTimeOfDay);
    setOpen(false);
  };

  const startRange = 8;
  const endRange = 19;
  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          type="button"
          className={cn("flex gap-2", className)}
        >
          <PlusCircle className="h-4 w-4" />
          <p>Add Schedule</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Schedule</DialogTitle>
          <DialogDescription>Create your schedule</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p className="font-medium">Day of the week</p>
          <Select value={day} onValueChange={(value) => void setDay(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Day of the Week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monday">Monday</SelectItem>
              <SelectItem value="tuesday">Tuesday</SelectItem>
              <SelectItem value="wednesday">Wednesday</SelectItem>
              <SelectItem value="thursday">Thursday</SelectItem>
              <SelectItem value="friday">Friday</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full gap-2">
          <div className="w-full space-y-2">
            <p className="font-medium">Start Time</p>
            <Select
              value={startTime.toString() ?? undefined}
              onValueChange={(value) => setStartTime(parseInt(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Start Time" />
              </SelectTrigger>
              <SelectContent>
                {getAllHoursBetween(startRange, endRange).map(
                  ({ name, value }, index) => (
                    <SelectItem key={index} value={value.toString()}>
                      {name}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full space-y-2">
            <p className="font-medium">End Time</p>
            <Select
              value={endTime.toString() ?? undefined}
              onValueChange={(value) => setEndTime(parseInt(value))}
            >
              <SelectTrigger disabled={!Boolean(startTime)} className="w=full">
                <SelectValue placeholder="End Time" />
              </SelectTrigger>
              <SelectContent>
                {getAllHoursBetween(startTime + 1, endRange).map(
                  ({ name, value }, index) => (
                    <SelectItem key={index} value={value.toString()}>
                      {name}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleAddSchedule} type="button">
            Add Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
