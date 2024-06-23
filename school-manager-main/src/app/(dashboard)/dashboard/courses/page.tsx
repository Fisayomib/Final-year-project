"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeTableLoading } from "../_components/time-table-loading";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { AddCourseModal } from "./_components/add-course-modal";
import { api } from "@/trpc/react";
import { Suspense } from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Separator } from "@/components/ui/separator";

export default function CoursesPage() {
  const query = api.user.getUser.useQuery();
  const courses = api.course.getAllCourses.useQuery();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="mx-auto w-full max-w-[700px]">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap justify-between gap-2">
              <div className="h-fit">
                <CardTitle>Courses</CardTitle>
                <div className=" text-sm text-muted-foreground">
                  {query.isPending ? (
                    <p>Loading...</p>
                  ) : query.data ? (
                    <span className="flex h-5 items-center space-x-4">
                      <span>{query.data.department}</span>
                      <Separator orientation="vertical" />
                      <span>{query.data.level} Level</span>
                      <Separator orientation="vertical" />
                      <span>Omega Semester</span>
                    </span>
                  ) : null}
                </div>
              </div>
              <AddCourseModal>
                <Button className="flex gap-2">
                  <PlusIcon className="h-4 w-4" />
                  <p>Add Course</p>
                </Button>
              </AddCourseModal>
            </div>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<TimeTableLoading />}>
              <DataTable columns={columns} data={courses.data ?? []} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
