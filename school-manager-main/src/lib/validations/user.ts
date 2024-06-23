import { z } from "zod";

export const UserSchema = z.object({
  fullname: z.string(),
  department: z.string(),
  level: z.union([
    z.literal("100"),
    z.literal("200"),
    z.literal("300"),
    z.literal("400"),
    z.literal("500"),
  ]),
});

export type UserSchema = z.infer<typeof UserSchema>;
