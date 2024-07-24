import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { View, SafeAreaView, Image, Text, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

// Style
import styles from "./styles";

// Components
import ActivityCard from "../../components/ActivityCard";
import DashboardCard from "../../components/DashboardCard";
import SavingActivityCard from "../../components/SavingsActivityCard";
import DeductSavingsForm from "../../components/DeductSavingsForm";
import DeductionActvityCard from "../../components/DeductionActivityCard";

export default function IncomeSaving() {
  const expenses = useSelector((state) => state.expenses.expenses);
  const incomes = useSelector((state) => state.incomes.incomes);
  const savings = useSelector((state) => state.savings.savings);
  const savingDeductions = useSelector(
    (state) => state.savings.savingDeductions
  );
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = dayjs(expense.expense_date_time);
    return (
      expenseDate.month() === currentMonth && expenseDate.year() === currentYear
    );
  });

  const getThreeLatestDeductions = (deductions) => {
    return [...deductions]
      .sort((a, b) => new Date(b.spending_date) - new Date(a.spending_date))
      ?.slice(0, 2);
  };

  const latestDeductions = getThreeLatestDeductions(savingDeductions);
  console.log(latestDeductions);

  const currentMonthIncome = incomes.filter((income) => {
    const incomeDate = dayjs(income.income_date);
    return (
      incomeDate.month() === currentMonth && incomeDate.year() === currentYear
    );
  });

  const totalAmountOfExpense = currentMonthExpenses.reduce((sum, expense) => {
    return sum + expense.expense_amount;
  }, 0);

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

  const reduced_income =
    incomeCalculated - totalAmountOfExpense < 0
      ? 0
      : incomeCalculated - totalAmountOfExpense;

  const totalAmountOfIncome = incomeCalculated < 0 ? 0 : incomeCalculated;

  const sortedIncomes = incomes.slice(0, 2).sort((a, b) => {
    return new Date(b.income_date_time) - new Date(a.income_date_time);
  });

  const renderHeader = () => (
    <>
      <View style={styles.container_main_one}>
        <View style={styles.container_one}>
          <Image
            source={require("../../assets/income.png")}
            style={styles.header_image}
          />
          <Text style={styles.text_one}>Incomes &amp; Savings</Text>
        </View>
      </View>

      <View style={styles.container_two_main}>
        <View style={styles.container_two}>
          <DashboardCard
            intro_text="Income as of"
            amount={totalAmountOfIncome}
            image={require("../../assets/income.png")}
            color="#4CCD99"
          />
        </View>
        <View style={styles.container_two}>
          <DashboardCard
            intro_text="Savings as of"
            amount={totalAmountOfSaving}
            image={require("../../assets/piggy-bank.png")}
            color="#00A9FF"
          />
        </View>
      </View>

      <View>
        <DeductSavingsForm />
      </View>

      <Text style={styles.text_two}>Recent Savings</Text>
      <FlatList
        data={savings}
        renderItem={({ item }) => <SavingActivityCard activity={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list_two}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.text_two}>Recent Incomes</Text>
    </>
  );

  const renderFooter = () => (
    <>
      {latestDeductions && (
        <>
          <Text style={styles.text_two}>Recent Saving Expenses</Text>
          <FlatList
            data={latestDeductions}
            renderItem={({ item }) => <DeductionActvityCard activity={item} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.list_two}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sortedIncomes}
        renderItem={({ item }) => <ActivityCard activity={item} />}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.list_two}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
