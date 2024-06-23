import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { task } from "../../db/schema";
import { and, eq } from "drizzle-orm";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        task: z.string().min(3, "task has to be atleast 3 characters"),
        date: z.string().date(),
        time: z.string().time(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(task).values({
        task: input.task,
        time: input.time,
        date: new Date(input.date),
        userId: ctx.auth.userId,
      });
    }),

  getAllTaskDays: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.task.findMany({
      columns: {
        date: true,
      },
      where: eq(task.userId, ctx.auth.userId),
    });
  }),

  getTasksByDate: protectedProcedure
    .input(
      z.object({
        date: z.string().date().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.task.findMany({
        where: and(
          eq(task.date, input.date ? new Date(input.date) : new Date()),
          eq(task.userId, ctx.auth.userId),
        ),
        orderBy: (task, { asc }) => [asc(task.time)],
      });
    }),

  markTaskStatus: protectedProcedure
    .input(z.object({ id: z.number(), isCompleted: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(task)
        .set({ isCompleted: input.isCompleted })
        .where(eq(task.id, input.id));
    }),

  removeTask: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(
      async ({ ctx, input }) =>
        await ctx.db.delete(task).where(eq(task.id, input.id)),
    ),
});
