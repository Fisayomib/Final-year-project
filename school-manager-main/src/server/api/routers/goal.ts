import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { goal } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { GoalSchema } from "@/lib/validations/goal";

export const goalRouter = createTRPCRouter({
  create: protectedProcedure
    .input(GoalSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(goal).values({
        title: input.title,
        description: input.description,
        userId: ctx.auth.userId,
      });
    }),

  getAllGoals: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.goal.findMany({
      where: eq(goal.userId, ctx.auth.userId),
    });
  }),

  removeGoal: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(
      async ({ ctx, input }) =>
        await ctx.db.delete(goal).where(eq(goal.id, input.id)),
    ),
});
