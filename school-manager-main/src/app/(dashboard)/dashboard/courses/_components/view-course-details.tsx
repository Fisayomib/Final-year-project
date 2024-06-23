"use client";
import { type RouterInputs, api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";

type id = RouterInputs["course"]["getCourseById"]["id"];

interface ViewCourseDetailsProps {
  id: id;
}

export function ViewCourseDetails({ id }: ViewCourseDetailsProps) {
  const query = api.course.getCourseById.useQuery({ id });
  return (
    <div className="py-6">
      {query.isPending && <ViewCourseDetailsLoadingState />}
      {query.data && (
        <div className="space-y-2">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-medium">Code</h3>
              <p>{query.data.courseCode}</p>
            </div>
            <div>
              <h3 className="font-medium">Name</h3>
              <p>{query.data.courseName}</p>
            </div>
            <div>
              <h3 className="font-medium">Units</h3>
              <p>{query.data.units}</p>
            </div>
          </div>
          <div className="space-y-2">
            {query.data.lecture.map((lecture, index) => (
              <div className="rounded-md bg-muted p-2" key={index}>
                <h4 className="font-medium  capitalize">{lecture.dayOfWeek}</h4>
                <div className="flex gap-2">
                  <span>{lecture.timeOfDay}</span>-
                  <span>{lecture.endTimeOfDay}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const ViewCourseDetailsLoadingState = () => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-full" />
    </div>
    <Skeleton className="h-[70px] w-full" />
    <Skeleton className="h-[70px] w-full" />
    <Skeleton className="h-[70px] w-full" />
  </div>
);
