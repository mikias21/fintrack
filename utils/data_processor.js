import { groupBy } from "lodash"; // Install lodash for convenient grouping

export const getMonthlyExpenseData = (expenseData) => {
  const currentYear = new Date().getFullYear(); // Get current year

  // Filter for expenses in the current year
  const filteredExpenses = expenseData.filter(
    (expense) => new Date(expense.expense_date).getFullYear() === currentYear
  );

  // Group expenses by month (0-indexed: January = 0, December = 11)
  const groupedByMonth = groupBy(filteredExpenses, (expense) => {
    return new Date(expense.expense_date).getMonth();
  });

  // Calculate total expense amount for each month
  const expenseAmounts = [];
  for (let month = 0; month < 12; month++) {
    const expensesForMonth = groupedByMonth[month] || [];
    expenseAmounts.push(
      expensesForMonth.reduce((sum, expense) => sum + expense.expense_amount, 0)
    );
  }

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return { labels, expenseAmounts };
};
