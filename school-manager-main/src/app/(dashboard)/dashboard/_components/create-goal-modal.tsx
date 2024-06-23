import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateGoalForm } from "./create-goal-form";

interface CreateGoalModalProps {
  children: JSX.Element;
}

export const CreateGoalModal = ({ children }: CreateGoalModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create semester goals</DialogTitle>
          <DialogDescription>
            Fill form to create semester goals
          </DialogDescription>
        </DialogHeader>
        <CreateGoalForm />
      </DialogContent>
    </Dialog>
  );
};
