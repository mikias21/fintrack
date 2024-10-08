import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

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
    const expenseDate = dayjs(expense.expense_date);
    return (
      expenseDate.month() === currentMonth && expenseDate.year() === currentYear
    );
  });

  const totalAmountOfExpense = currentMonthExpenses.reduce((sum, expense) => {
    return sum + expense.expense_amount;
  }, 0);

  const renderHeader = () => (
    <>
      
      <View style={styles.container_one_main}>
        <View style={styles.container_one}>
          <Image
            source={require("../../assets/spending.png")}
            style={styles.header_image}
          />
          <Text style={styles.text_one}>Expenses</Text>
        </View>
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
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        data={[{ key: "header" }]}
        renderItem={() => renderHeader()}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
    </SafeAreaView>
  );
}
