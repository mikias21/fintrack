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

const getMostRecentItems = (items, dateField, count = 3) => {
  return items
    .slice()
    .sort((a, b) => new Date(b[dateField]) - new Date(a[dateField]))
    .slice(0, count);
};

const mergeAndSortItems = (expenses, incomes) => {
  const recentExpenses = getMostRecentItems(expenses, "expense_date");
  const recentIncomes = getMostRecentItems(incomes, "income_date");

  const mergedList = [
    ...recentExpenses.map((item) => ({
      ...item,
      date: item.expense_date,
      type: "expense",
    })),
    ...recentIncomes.map((item) => ({
      ...item,
      date: item.income_date,
      type: "income",
    })),
  ];

  return mergedList.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const formatMoneyAmount = (amount) => {
  return amount.toFixed(2);
};

const formatDateForTable = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

export { formatDate, mergeAndSortItems, formatMoneyAmount, formatDateForTable };
