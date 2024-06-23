"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-text-area";
import { GoalSchema } from "@/lib/validations/goal";
import { api } from "@/trpc/react";
import { Loader } from "lucide-react";

export function CreateGoalForm() {
  const utils = api.useUtils();

  const mutation = api.goal.create.useMutation({
    onSuccess: async () => {
      await utils.goal.getAllGoals.invalidate();
      return toast.success("Goal created successfully");
    },
    onError: () => toast.error("Failed to create goal"),
  });
  const form = useForm<GoalSchema>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: GoalSchema) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormInput
          control={form.control}
          name="title"
          label="Title"
          placeholder="Goal Title"
        />
        <FormTextarea
          control={form.control}
          name="description"
          label="Description"
        />
        <Button disabled={mutation.isPending} type="submit">
          {mutation.isPending && <Loader className="h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
