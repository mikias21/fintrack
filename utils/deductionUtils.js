export const getThreeLatestDeductions = (deductions) => {
    return [...deductions]
      .sort((a, b) => new Date(b.spending_date) - new Date(a.spending_date))
      ?.slice(0, 2);
  };