import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";

// Style
import styles from "./styles";

// Components
import Table from "../../components/Table";
import CalendarChart from "../../components/CalendarChart";
import DashboardCard from "../../components/DashboardCard";

export default function Expenses() {
  const expenses = useSelector((state) => state.expenses.expenses);
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const sortedExpenses = expenses.slice().sort((a, b) => {
    return new Date(a.expense_date) - new Date(b.expense_date);
  });

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = dayjs(expense.expense_date_time);
    return (
      expenseDate.month() === currentMonth && expenseDate.year() === currentYear
    );
  });

  const totalAmountOfExpense = currentMonthExpenses.reduce((sum, expense) => {
    return sum + expense.expense_amount;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container_one}>
          <Image
            source={require("../../assets/spending.png")}
            style={styles.header_image}
          />
          <Text style={styles.text_one}>Expenses</Text>
        </View>

        <View style={styles.container_two}>
          <DashboardCard
            intro_text="Expenses as of"
            amount={totalAmountOfExpense}
            image={require("../../assets/costs.png")}
            color="#FC819E"
          />
        </View>

        <Table data={sortedExpenses} />

        <CalendarChart data={sortedExpenses} />
      </ScrollView>
    </SafeAreaView>
  );
}
