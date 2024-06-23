"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/lib/validations/user";
import { api, type RouterOutputs } from "@/trpc/react";
import { toast } from "sonner";
import { FormSelectInput } from "@/components/form/form-select-input";
import { Loader } from "lucide-react";

interface ProfileFormProps {
  data: RouterOutputs["user"]["getUser"];
}

export function ProfileForm({ data }: ProfileFormProps) {
  const utils = api.useUtils();
  const mutation = api.user.upsertUser.useMutation({
    onError: () => toast.error("Failed to Update User information"),
    onSuccess: async () => {
      await utils.user.getUser.invalidate();
      toast.success("User Information updated successfully");
    },
  });
  // 1. Define your form.
  const form = useForm<UserSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullname: data?.fullName ?? "",
      department: data?.department ?? "",
      level: data?.level,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: UserSchema) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[400px] space-y-4"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>This is your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input
                  placeholder="Electrical Electronics Engineering"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter you department</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSelectInput
          control={form.control}
          name="level"
          label="Level"
          description="Enter your current level"
          placeholder="Select your current level"
          options={Array(5)
            .fill(null)
            .map((_, index) => ({
              name: `${index + 1}00 level`,
              value: `${index + 1}00`,
            }))}
        />
        <div>
          <Button disabled={mutation.isPending} type="submit">
            {mutation.isPending && (
              <Loader className="mr-2 size-4 animate-spin" />
            )}
            Update User Details
          </Button>
        </div>
      </form>
    </Form>
  );
}
