import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { UserSchema } from "@/lib/validations/user";
import { user } from "../../db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  upsertUser: protectedProcedure
    .input(UserSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(user)
        .values({
          department: input.department,
          fullName: input.fullname,
          level: input.level,
          userId: ctx.auth.userId,
        })
        .onConflictDoUpdate({
          target: user.userId,
          set: {
            ...input,
          },
        });
    }),

  getUser: protectedProcedure.query(({ ctx }) =>
    ctx.db.query.user.findFirst({ where: eq(user.userId, ctx.auth.userId) }),
  ),
});
