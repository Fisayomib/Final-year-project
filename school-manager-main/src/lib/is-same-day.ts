export function isSameDay(d1: Date, d2: Date) {
  // Compare year, month, and day
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
