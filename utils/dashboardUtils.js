const getTwoLatestExpenses = (expenses) => {
    if (expenses.length <= 2) {
      return expenses;
    }
  
    return [...expenses]
      .sort((a, b) => new Date(b.expense_date) - new Date(a.expense_date))
      .slice(0, 2);
  };
  
  const getTwoLatestIncomes = (incomes) => {
    if (incomes.length <= 2) {
      return incomes;
    }
  
    return [...incomes]
      .sort((a, b) => new Date(b.income_date) - new Date(a.income_date))
      .slice(0, 2);
  };
  
  const getTwoLatestDebts = (debts) => {
    if (debts.length <= 2) {
      return debts;
    }
  
    return [...debts]
      .sort((a, b) => new Date(b?.debt_date) - new Date(a?.debt_date))
      .slice(0, 2);
  };

  const getTwoLatestSavings = (savings) => {
    if (savings.length <= 2) {
      return savings;
    }
  
    return [...savings]
      .sort((a, b) => new Date(b?.saving_date) - new Date(a?.saving_date))
      .slice(0, 2);
  };

export {getTwoLatestExpenses,
    getTwoLatestIncomes,
    getTwoLatestDebts,
    getTwoLatestSavings};