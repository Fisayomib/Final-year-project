import { Skeleton } from "@/components/ui/skeleton";

export const TimeTableLoading = () => (
  <table className="w-full">
    <tbody>
      {Array(8)
        .fill(null)
        .map((_, index) => (
          <tr key={index}>
            {Array(8)
              .fill(null)
              .map((_, pos) => (
                <td key={pos}>
                  <Skeleton className="h-[20px] w-full" />
                </td>
              ))}
          </tr>
        ))}
    </tbody>
  </table>
);
