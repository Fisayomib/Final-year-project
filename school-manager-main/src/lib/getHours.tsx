import { Time } from "@internationalized/date";

export function getAllHoursBetween(startTime: number, endTime: number) {
  const hours = [];
  for (let i = startTime; i <= endTime; i++) {
    // Convert the hour to a string and pad with leading zero if necessary
    const hourString = i.toString().padStart(2, "0");
    hours.push({ value: i, name: hourString + ":00" });
  }
  return hours;
}

export const formatTimeFromHour = (hour: number) => {
  return new Time(hour);
};
