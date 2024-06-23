"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, TrashIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateTaskModal } from "./create-task-modal";
import { Checkbox } from "@/components/ui/checkbox";
import { EventCalendar } from "./event-calender";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { api } from "@/trpc/react";
import { type Time, parseTime } from "@internationalized/date";
import { format } from "date-fns";
import { toast } from "sonner";

export const Scheduler = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const date = searchParams.get("date");
  const formattedDate = date ? new Date(date) : null;
  const prettyDate = format(
    date ? new Date(date) : new Date(),
    "cccc, eo MMMM",
  );

  const utils = api.useUtils();

  const query = api.task.getAllTaskDays.useQuery();
  const taskQuery = api.task.getTasksByDate.useQuery({
    date,
  });

  const updateMutation = api.task.markTaskStatus.useMutation({
    onError: () => toast.error("Something Went Wrong"),
    onSuccess: async (_, { isCompleted }) => {
      await utils.task.getTasksByDate.invalidate();
      toast.success(
        `Task marked as ${isCompleted ? "Completed" : "Not Completed"}`,
      );
    },
  });

  const removeMutation = api.task.removeTask.useMutation({
    onError: () => toast.error("Something Went Wrong"),
    onSuccess: async () => {
      await utils.task.getTasksByDate.invalidate();
      toast.success("Task deleted successfully");
    },
  });

  const handleSetDateParam = (date: Date | undefined) => {
    if (!date) return;

    const params = new URLSearchParams(searchParams);
    params.set("date", format(date, "yyyy-MM-dd"));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleUpdate = (id: number, isCompleted: boolean) =>
    updateMutation.mutate({ id, isCompleted });
  const handleRemove = (id: number) => removeMutation.mutate({ id });

  return (
    <div className="grid flex-1 grid-cols-8 rounded-lg border border-dashed shadow-sm md:flex-grow-0 md:basis-[400px]">
      <div className=" col-span-8 flex flex-shrink flex-col lg:col-span-5">
        <div className="flex basis-[fit-content] flex-wrap items-center justify-between gap-4 border-b border-border p-4">
          <div>
            <h1 className="hidden text-base font-medium md:text-lg lg:block lg:text-2xl">
              {prettyDate}
            </h1>
            <Popover>
              <PopoverTrigger asChild>
                <span className="flex cursor-pointer items-center gap-2 lg:hidden">
                  <h1 className="text-base md:text-lg lg:text-2xl">
                    {prettyDate}
                  </h1>
                  <ChevronDown className="h-4 w-4" />
                </span>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  selected={formattedDate ?? undefined}
                  onSelect={handleSetDateParam}
                  modifiers={{ task: query.data?.map((d) => d.date) ?? [] }}
                  modifiersClassNames={{ task: "task" }}
                  mode="single"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-sm text-muted-foreground">
              These are your tasks for the day
            </p>
          </div>
          <CreateTaskModal />
        </div>
        <div className="flex max-h-[300px] flex-1 flex-col overflow-y-auto p-4">
          {taskQuery.isPending ? (
            <TaskLoading />
          ) : taskQuery.data?.length ? (
            <div className="space-y-6">
              {taskQuery.data.map((task, index) => (
                <Task
                  key={index}
                  Task={task.task}
                  isCompleted={task.isCompleted}
                  onUpdate={() => handleUpdate(task.id, !task.isCompleted)}
                  onRemove={() => handleRemove(task.id)}
                  date={task.date}
                  time={parseTime(task.time)}
                />
              ))}
            </div>
          ) : (
            <TaskEmpty />
          )}
        </div>
      </div>
      <div className="col-span-8 hidden gap-1 border-l border-border text-center lg:col-span-3 lg:flex lg:flex-col">
        <EventCalendar
          // offset because react-calender does 02:23 for 03:00
          selected={formattedDate ?? undefined}
          onSelect={handleSetDateParam}
          modifiers={{ task: query.data?.map((d) => d.date) ?? [] }}
          modifiersClassNames={{ task: "task" }}
          mode="single"
        />
      </div>
    </div>
  );
};

const TaskEmpty = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold tracking-tight">You have no Tasks</h3>
      <p className="text-sm text-muted-foreground">
        Create a Task to see it appear here
      </p>
      <CreateTaskModal />
    </div>
  </div>
);

export const TaskLoading = () => (
  <div className="space-y-4">
    {Array(5)
      .fill(null)
      .map((_, index) => (
        <div key={index} className="flex space-x-4">
          <Skeleton className="h-4 w-4 rounded-none" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
  </div>
);
interface TaskProps {
  Task: string;
  date: Date;
  time: Time;
  isCompleted: boolean;
  onRemove: () => void;
  onUpdate: () => void;
}

const Task = ({
  Task,
  onUpdate,
  isCompleted,
  onRemove,
  time,
  date,
}: TaskProps) => {
  return (
    <li className="flex justify-between">
      <div className="flex gap-2">
        <Checkbox className="mt-1" checked={isCompleted} onClick={onUpdate} />
        <div>
          <p className={cn("font-medium", isCompleted ? "line-through" : null)}>
            {Task}
          </p>
          <small>
            {format(date, "PPP")} {time.toString()}
          </small>
        </div>
      </div>
      <Button onClick={onRemove} className="px-2 py-1" variant="outline">
        <TrashIcon className="h-4 w-4" />
      </Button>
    </li>
  );
};
