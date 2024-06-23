import { z } from "zod";

export const TaskSchema = z.object({
  task: z.string().min(3, "task has to be atleast 3 characters"),
  date: z.date(),
  time: z.string().time(),
});

export type TaskSchema = z.infer<typeof TaskSchema>;
