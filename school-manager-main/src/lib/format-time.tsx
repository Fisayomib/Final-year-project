export function formatTime(date: Date) {
  // Extract hours and minutes from the date object
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Pad minutes with leading zeros if necessary
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Format the time as "10:30 PM"
  const formattedTime = hours + ":" + formattedMinutes + " " + ampm;

  return formattedTime;
}
