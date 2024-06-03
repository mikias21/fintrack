function formatDate(dateString) {
  // Parse the input date string
  const [year, month, day] = dateString.split("-");

  // Convert month from numeric value to month name
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[parseInt(month, 10) - 1]; // Subtract 1 because months are zero-indexed

  // Add suffix to day (e.g., 1st, 2nd, 3rd, 4th, etc.)
  let daySuffix;
  if (day.endsWith("1") && !day.endsWith("11")) {
    daySuffix = "st";
  } else if (day.endsWith("2") && !day.endsWith("12")) {
    daySuffix = "nd";
  } else if (day.endsWith("3") && !day.endsWith("13")) {
    daySuffix = "rd";
  } else {
    daySuffix = "th";
  }

  // Format the date string
  const formattedDate = `${monthName} ${parseInt(day, 10)}${daySuffix} ${year}`;

  return formattedDate;
}

export { formatDate };
