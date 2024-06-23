import { Scheduler } from "./_components/scheduler";
import { Goals } from "./_components/goals";

export default function SchedulePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <Scheduler />
      <Goals />
    </main>
  );
}
