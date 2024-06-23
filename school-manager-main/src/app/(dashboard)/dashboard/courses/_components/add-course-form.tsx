"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CourseSchema } from "@/lib/validations/course";
import { FormInput } from "@/components/form/form-input";
import { Loader, Trash2Icon } from "lucide-react";
import { AddTableForm } from "./add-table-form";
import { toast } from "sonner";
import { api } from "@/trpc/react";

interface AddCourseFormProps {
  onClose: () => void;
}

export function AddCourseForm({ onClose }: AddCourseFormProps) {
  const utils = api.useUtils();
  const mutation = api.course.create.useMutation({
    onSuccess: async () => {
      await utils.course.getAllCourses.invalidate();
      toast.success("Course Add Successfully");
      onClose();
    },
    onError: () => toast.error("Failed to add course"),
  });

  const form = useForm<CourseSchema>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      courseCode: "",
      courseName: "",
      units: 0,
      classes: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "classes", // unique name for your Field Array
  });

  // 2. Define a submit handler.
  function onSubmit(values: CourseSchema) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormInput
          control={form.control}
          name="courseCode"
          label="Course Code"
          placeholder="TMC411"
        />
        <FormInput
          control={form.control}
          name="courseName"
          label="Course Name"
          placeholder="Total Man Concept"
        />
        <FormInput
          control={form.control}
          name="units"
          label="Units"
          type="number"
        />
        <div>
          <div className="border-b border-border p-0 pb-2">
            <h3 className="text-lg font-medium">Schedule</h3>
            <p>Create your schedule</p>
          </div>
          <div className="flex flex-col space-y-4 p-0 pt-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between rounded-md border border-border p-2"
              >
                <FormField
                  control={form.control}
                  name={`classes.${index}.timeOfDay`}
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <h4 className="font-medium  capitalize">
                            {field.dayOfWeek}
                          </h4>
                          <div className="flex gap-2">
                            <span>{field.timeOfDay}</span>-
                            <span>{field.endTimeOfDay}</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={() => remove(index)}
                  variant="outline"
                  className="p-2"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            ))}
            <AddTableForm
              onSchedule={(
                dayOfWeek: CourseSchema["classes"][number]["dayOfWeek"],
                timeOfDay: CourseSchema["classes"][number]["timeOfDay"],
                endTimeOfDay: CourseSchema["classes"][number]["endTimeOfDay"],
              ) => void append({ dayOfWeek, timeOfDay, endTimeOfDay })}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-2">
          <Button type="button" variant={"secondary"}>
            Cancel
          </Button>
          <Button type="submit" className="flex items-center gap-1">
            {mutation.isPending && <Loader className="size-4 animate-spin" />}
            Add Course
          </Button>
        </div>
      </form>
    </Form>
  );
}
