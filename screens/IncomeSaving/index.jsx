import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  FlatList,
} from "react-native";

// Style
import styles from "./styles";

// Components
import ActivityCard from "../../components/ActivityCard";
import DashboardCard from "../../components/DashboardCard";

export default function IncomeSaving() {
  const expenses = useSelector((state) => state.expenses.expenses);
  const incomes = useSelector((state) => state.incomes.incomes);
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = dayjs(expense.expense_date_time);
    return (
      expenseDate.month() === currentMonth && expenseDate.year() === currentYear
    );
  });

  const currentMonthIncome = incomes.filter((income) => {
    const incomeDate = dayjs(income.income_date_time);
    return (
      incomeDate.month() === currentMonth && incomeDate.year() === currentYear
    );
  });

  const totalAmountOfExpense = currentMonthExpenses.reduce((sum, expense) => {
    return sum + expense.expense_amount;
  }, 0);

  let incomeCalculated =
    currentMonthIncome.reduce((sum, income) => {
      return sum + income.income_amount;
    }, 0) - totalAmountOfExpense;

  const totalAmountOfIncome = incomeCalculated < 0 ? 0 : incomeCalculated;

  const sortedExpenses = expenses.slice().sort((a, b) => {
    return new Date(b.expense_date_time) - new Date(a.expense_date_time);
  });

  const sortedIncomes = incomes.slice().sort((a, b) => {
    return new Date(b.income_date_time) - new Date(a.income_date_time);
  });

  const recentActivities = sortedIncomes.slice(0, 3);
  //   const recentActivities = sortedExpenses.slice(0, 3);

  const renderRecentActivity = () => {
    return (
      <>
        <Text style={styles.text_two}>Recent Incomes</Text>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container_one}>
          <Image
            source={require("../../assets/income.png")}
            style={styles.header_image}
          />
          <Text style={styles.text_one}>Incomes &amp; Savings</Text>
        </View>
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
            amount={0}
            image={require("../../assets/piggy-bank.png")}
            color="#00A9FF"
          />
        </View>
        {/* <Text style={styles.text_two}>Recent Incomes</Text> */}
        <View>
          <FlatList
            data={recentActivities}
            renderItem={({ item }) => <ActivityCard activity={item} />}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={renderRecentActivity}
            contentContainerStyle={styles.list_two}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
