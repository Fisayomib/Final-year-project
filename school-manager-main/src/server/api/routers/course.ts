import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type Lecture, course, lecture } from "../../db/schema";
import { eq } from "drizzle-orm";
import { CourseSchema } from "@/lib/validations/course";
import { z } from "zod";
import { formatTimeFromHour } from "../../../lib/getHours";
import { parseTime } from "@internationalized/date";

export const courseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CourseSchema)
    .mutation(async ({ ctx, input }) => {
      const courseId = await ctx.db
        .insert(course)
        .values({
          courseCode: input.courseCode,
          courseName: input.courseName,
          units: input.units,
          userId: ctx.auth.userId,
        })
        .returning({ insertedId: course.id });

      await ctx.db.insert(lecture).values(
        input.classes.map((lectureUnit) => ({
          courseId: courseId[0]?.insertedId,
          dayOfWeek: lectureUnit.dayOfWeek,
          endTimeOfDay: lectureUnit.endTimeOfDay,
          timeOfDay: lectureUnit.timeOfDay,
        })),
      );
    }),
  getAllCourses: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.course.findMany({
      where: eq(course.userId, ctx.auth.userId),
    });
  }),
  getUserTimeTable: protectedProcedure.query(async ({ ctx }) => {
    const courses = await ctx.db.query.course.findMany({
      with: { lecture: true },
      where: eq(course.userId, ctx.auth.userId),
    });

    const timeTable: Record<
      Lecture["dayOfWeek"],
      ({ courseCode: string; timeOfDay: string; endTimeOfDay: string } | null)[]
    > = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    };

    for (const key in timeTable) {
      let pointer = 8;
      while (pointer < 20) {
        let activeLecture: {
          courseCode: string;
          timeOfDay: string;
          endTimeOfDay: string;
        } | null = null;
        for (const activeCourse of courses) {
          const foundLecture = activeCourse.lecture.find(
            (l) =>
              l.dayOfWeek === key &&
              l.timeOfDay === formatTimeFromHour(pointer).toString(),
          );
          if (!foundLecture) continue;

          activeLecture = {
            courseCode: activeCourse.courseCode,
            timeOfDay: foundLecture.timeOfDay,
            endTimeOfDay: foundLecture.endTimeOfDay,
          };
          break;
        }

        timeTable[key as Lecture["dayOfWeek"]].push(activeLecture);

        if (!activeLecture) pointer++;
        else {
          const startTimeHour = parseTime(activeLecture.timeOfDay).hour;
          const endTimeHour = parseTime(activeLecture.endTimeOfDay).hour;
          const span = endTimeHour - startTimeHour;

          pointer = pointer + span;
        }
      }
    }

    return timeTable;
  }),
  getCourseById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.course.findFirst({
        where: eq(course.id, input.id),
        with: { lecture: true },
      });
    }),
  updateCourse: protectedProcedure
    .input(z.object({ id: z.number(), data: CourseSchema }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(course)
        .set({
          courseCode: input.data.courseCode,
          courseName: input.data.courseName,
          units: input.data.units,
        })
        .where(eq(course.id, input.id));
    }),
  removeLecture: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(lecture).where(eq(lecture.id, input.id));
    }),
  removeCourse: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(lecture).where(eq(lecture.courseId, input.id));
      await ctx.db.delete(course).where(eq(course.id, input.id));
    }),
});
