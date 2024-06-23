import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { CreateTaskForm } from "./create-task-form";

export const CreateTaskModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2 gap-1">
          <PlusIcon className="h-4 w-4" />
          <p>New Task</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Task Details</DialogTitle>
          <DialogDescription>
            Fill in the information to create a task
          </DialogDescription>
        </DialogHeader>

        <CreateTaskForm />
      </DialogContent>
    </Dialog>
  );
};
