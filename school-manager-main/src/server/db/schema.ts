// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  pgEnum,
  integer,
  time,
  date,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const levelEnum = pgEnum("level", ["100", "200", "300", "400", "500"]);
export const DayOfWeek = pgEnum("day_of_the_week", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
]);

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 30 }).notNull(),
  department: varchar("department", { length: 30 }).notNull(),
  level: levelEnum("level").notNull(),
  userId: varchar("user_id").notNull().unique(),
});

export const task = pgTable("task", {
  id: serial("id").primaryKey(),
  task: varchar("task", { length: 256 }).notNull(),
  time: time("time").notNull(),
  date: date("date", { mode: "date" }).notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  userId: varchar("user_id").notNull(),
});

export const goal = pgTable("goal", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: varchar("description", { length: 400 }).notNull(),
  userId: varchar("user_id").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const course = pgTable("course", {
  id: serial("id").primaryKey(),
  courseCode: text("courseCode").unique().notNull(),
  courseName: text("courseName").unique().notNull(),
  units: integer("units").notNull(),
  userId: varchar("user_id").notNull(),
});

export const courseRelations = relations(course, ({ many }) => ({
  lecture: many(lecture),
}));

export const lecture = pgTable("class", {
  id: serial("id").primaryKey(),
  dayOfWeek: DayOfWeek("day_of_week").notNull(),
  timeOfDay: time("time_of_day").notNull(),
  endTimeOfDay: time("end_time_of_day").notNull(),
  courseId: integer("course_id"),
});

export type Lecture = typeof lecture.$inferSelect;

export const lectureRelations = relations(lecture, ({ one }) => ({
  course: one(course, {
    fields: [lecture.courseId],
    references: [course.id],
  }),
}));
