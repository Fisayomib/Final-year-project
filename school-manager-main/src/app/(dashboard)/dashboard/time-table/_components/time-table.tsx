"use client";
import { formatTimeFromHour } from "@/lib/getHours";
import type { RouterOutputs } from "@/trpc/react";
import { parseTime } from "@internationalized/date";

interface TimeTableProps {
  data: RouterOutputs["course"]["getUserTimeTable"];
}

export function TimeTable({ data }: TimeTableProps) {
  return (
    <div className="flex overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th></th>
            {Array(12)
              .fill(null)
              .map((_, index) => {
                const time = formatTimeFromHour(index + 8);
                return (
                  <th key={index}>
                    <div className="relative -left-1/2 w-[80px]">
                      {time.hour.toString().padStart(2, "0")}:
                      {time.minute.toString().padStart(2, "0")}
                    </div>
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((dayOfWeek, index) => {
            return (
              <tr key={index}>
                <td className="h-[80px] border-b border-t pr-[30px] capitalize">
                  {dayOfWeek}
                </td>
                {data[dayOfWeek as keyof typeof data].map((schedule, index) => {
                  if (!schedule)
                    return (
                      <td className="border border-border" key={index}></td>
                    );

                  const startTimeHour = parseTime(schedule.timeOfDay).hour;
                  const endTimeHour = parseTime(schedule.endTimeOfDay).hour;
                  const span = endTimeHour - startTimeHour;
                  return (
                    <td
                      key={index}
                      colSpan={span}
                      className="border border-border p-1"
                    >
                      <div className="mx-auto rounded-md bg-primary py-2 text-primary-foreground">
                        <p className="ml-2">{schedule?.courseCode}</p>
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
