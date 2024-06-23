"use client";
import { TimeTable } from "./_components/time-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TimeTableLoading } from "../_components/time-table-loading";
import { api } from "@/trpc/react";

export default function TimeTablePage() {
  const query = api.user.getUser.useQuery();
  const courseQuery = api.course.getUserTimeTable.useQuery();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="w-full">
        <Card className="mx-auto w-[700px]">
          <CardHeader>
            <CardTitle>Time Table</CardTitle>
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
          </CardHeader>
          <CardContent className="w-full">
            {courseQuery.isPending ? (
              <TimeTableLoading />
            ) : courseQuery.data ? (
              <TimeTable data={courseQuery.data} />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
