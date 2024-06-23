"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

import { TaskSchema } from "@/lib/validations/task";
import { FormDateInput } from "@/components/form/form-date-input";
import { FormTimeInput } from "@/components/form/form-time-input";
import { FormInput } from "@/components/form/form-input";
import { getYesterdaysDate } from "@/lib/get-yesterday-date";

import { api } from "@/trpc/react";
import { Loader } from "lucide-react";
import { format } from "date-fns";

export function CreateTaskForm() {
  const utils = api.useUtils();

  const mutation = api.task.create.useMutation({
    onSuccess: async () => {
      await utils.task.getTasksByDate.invalidate();
      toast.success("Task Created Successfully");
    },
    onError: () => {
      toast.error("Failed To Create Task");
    },
  });

  const form = useForm<TaskSchema>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      date: new Date(),
      task: "",
      time: "",
    },
  });

  function onSubmit(data: z.infer<typeof TaskSchema>) {
    const formattedDate = format(data.date, "yyyy-MM-dd");

    mutation.mutate({
      ...data,
      date: formattedDate,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex w-full gap-2">
            <FormDateInput
              control={form.control}
              name="date"
              label="Task Date"
              disabledFn={(date) => date < getYesterdaysDate()}
            />
            <FormTimeInput
              control={form.control}
              name="time"
              label="Event Time"
            />
          </div>
          <FormInput
            placeholder="Task"
            control={form.control}
            name="task"
            label="Task"
          />
        </div>
        <Button disabled={mutation.isPending} type="submit">
          {mutation.isPending && <Loader className="h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
