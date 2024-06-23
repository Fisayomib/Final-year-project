import { z } from "zod";

export const CourseSchema = z.object({
  courseName: z
    .string()
    .min(3, "Course Name must be atleast 3 characters long"),
  courseCode: z
    .string()
    .min(3, "Course Code must be atleast 3 characters long"),
  units: z.coerce.number(),
  classes: z.array(
    z.object({
      dayOfWeek: z.union([
        z.literal("monday"),
        z.literal("tuesday"),
        z.literal("wednesday"),
        z.literal("thursday"),
        z.literal("friday"),
      ]),
      timeOfDay: z.string().time(),
      endTimeOfDay: z.string().time(),
    }),
  ),
});

export type CourseSchema = z.infer<typeof CourseSchema>;
