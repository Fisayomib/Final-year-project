"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { truncateString } from "@/lib/truncate-string";
import { format } from "date-fns";
import { EyeIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreateGoalModal } from "./create-goal-modal";
import { api, type RouterOutputs } from "@/trpc/react";
import { toast } from "sonner";

export const Goals = () => {
  const utils = api.useUtils();

  const query = api.goal.getAllGoals.useQuery();
  const mutation = api.goal.removeGoal.useMutation({
    onSuccess: async () => {
      await utils.goal.getAllGoals.invalidate();
      toast.success("Goal Removed Successfully");
    },
    onError: () => toast.error("Failed to remove goal"),
  });

  const handleDelete = (id: number) => mutation.mutate({ id });

  return (
    <div>
      <h3 className="mb-4 text-2xl font-medium">Semester Goals</h3>
      <ul className="grid grid-cols-4 gap-4">
        {query.isLoading ? (
          <GoalsLoading />
        ) : query?.data?.length ? (
          <>
            {query.data.map((goal, index) => (
              <GoalCard
                key={index}
                data={goal}
                onDelete={() => handleDelete(goal.id)}
              />
            ))}

            <CreateGoalModal>
              <li className="col-span-4 flex h-[100px] cursor-pointer items-center rounded-md border border-dashed p-4 sm:col-span-2 md:col-span-4 lg:col-span-2">
                <div>
                  <h3 className="text-lg font-medium">Create New Goal</h3>
                  <p>Set a goal you want to achive for this semester</p>
                </div>
              </li>
            </CreateGoalModal>
          </>
        ) : (
          <CreateGoalModal>
            <li className="col-span-4 flex h-[100px] cursor-pointer items-center rounded-md border border-dashed p-4 sm:col-span-2 md:col-span-4 lg:col-span-2">
              <div>
                <h3 className="text-lg font-medium">Create New Goal</h3>
                <p>Set a goal you want to achive for this semester</p>
              </div>
            </li>
          </CreateGoalModal>
        )}
      </ul>
    </div>
  );
};

const GoalsLoading = () =>
  Array(3)
    .fill(null)
    .map((_, index) => (
      <Skeleton key={index} className="h-[100px] w-[300px]" />
    ));

interface GoalCardProps {
  data: RouterOutputs["goal"]["getAllGoals"][number];
  onDelete: () => void;
}

const GoalCard = ({ data, onDelete }: GoalCardProps) => {
  return (
    <li className="col-span-4 flex items-center justify-between gap-2 rounded-md border p-4 sm:col-span-2 md:col-span-4 lg:col-span-2">
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-1">
          <h3 className="text-lg font-medium">{data.title}</h3>
          {data.createdAt && (
            <p className="relative top-0.5 text-xs">
              {format(data.createdAt, "PPP HH:mm aa")}
            </p>
          )}
        </div>
        <p>{truncateString(data.description)}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onDelete} variant={"outline"} className="px-2 py-1">
          <TrashIcon className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"outline"} className="px-2 py-1">
              <EyeIcon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{data.title}</AlertDialogTitle>

              {data.createdAt && (
                <AlertDialogDescription className="relative top-0.5 text-xs">
                  {format(data.createdAt, "PPP HH:mm aa")}
                </AlertDialogDescription>
              )}
            </AlertDialogHeader>
            <p>{data.description}</p>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
};
