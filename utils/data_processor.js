import { groupBy } from "lodash"; // Install lodash for convenient grouping

export const getMonthlyExpenseData = (expenseData) => {
  const currentYear = new Date().getFullYear();

  const filteredExpenses = expenseData.filter(
    (expense) => new Date(expense.expense_date).getFullYear() === currentYear
  );

  const groupedByMonth = groupBy(filteredExpenses, (expense) => {
    return new Date(expense.expense_date).getMonth();
  });

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
