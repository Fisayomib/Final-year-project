"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { api, type RouterOutputs } from "@/trpc/react";
import { EyeIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ViewCourseDetails } from "./view-course-details";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Course = RouterOutputs["course"]["getAllCourses"][number];

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "courseCode",
    header: "Course Code",
  },
  {
    accessorKey: "courseName",
    header: "Name",
  },
  {
    accessorKey: "units",
    header: "Units",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      const utils = api.useUtils();
      const mutation = api.course.removeCourse.useMutation({
        onSuccess: async () => {
          await utils.course.getAllCourses.invalidate();
          toast.success("Course removed successfully");
        },
        onError: () => toast.error("Failed to remove course"),
      });

      const handleDelete = () => mutation.mutate({ id: course.id });

      return (
        <Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <SheetTrigger asChild>
                <DropdownMenuItem className="flex items-center gap-1">
                  <EyeIcon className="mr-2 size-4" />
                  View Course
                </DropdownMenuItem>
              </SheetTrigger>
              <DropdownMenuItem
                onClick={handleDelete}
                className="flex items-center gap-1"
              >
                <Trash2Icon className="mr-2 size-4" />
                Delete Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Course</SheetTitle>
              <SheetDescription>
                Enter course details to add a course
              </SheetDescription>
            </SheetHeader>
            <ViewCourseDetails id={course.id} />
          </SheetContent>
        </Sheet>
      );
    },
  },
];
