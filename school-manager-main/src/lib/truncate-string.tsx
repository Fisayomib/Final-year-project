export function truncateString(str: string) {
  const maxLength = 80;
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}
