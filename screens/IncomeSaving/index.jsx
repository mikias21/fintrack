import React from "react";
import dayjs from "dayjs";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

import styles from "./styles";

// Components
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import ActivityComponent from "./ActivityComponent";

// Utils
import { getThreeLatestDeductions } from "../../utils/deductionUtils";

export default function IncomeSaving() {
  const incomes = useSelector((state) => state.incomes.incomes);
  const savings = useSelector((state) => state.savings.savings);
  const savingDeductions = useSelector(
    (state) => state.savings.savingDeductions
  );
  
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const latestDeductions = getThreeLatestDeductions(savingDeductions);

  const currentMonthIncome = incomes.filter((income) => {
    const incomeDate = dayjs(income.income_date);
    return (
      incomeDate.month() === currentMonth && incomeDate.year() === currentYear
    );
  });

  const totalAmountOfDeduction = savingDeductions.reduce((sum, deduction) => {
    return sum + deduction.spending_amount;
  }, 0);

  let incomeCalculated = currentMonthIncome.reduce((sum, income) => {
    return sum + income.income_amount;
  }, 0);

  const totalAmountOfSaving =
    savings.reduce((sum, saving) => {
      return sum + saving.saving_amount;
    }, 0) - totalAmountOfDeduction;

  const totalAmountOfIncome = incomeCalculated < 0 ? 0 : incomeCalculated;

  const sortedIncomes = incomes.slice(0, 2).sort((a, b) => {
    return new Date(b.income_date_time) - new Date(a.income_date_time);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ActivityComponent sortedIncomes={sortedIncomes} />
      <HeaderComponent
        totalAmountOfIncome={totalAmountOfIncome}
        totalAmountOfSaving={totalAmountOfSaving}
        savings={savings}
      />
      <FooterComponent latestDeductions={latestDeductions} />
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
    </SafeAreaView>
  );
}
