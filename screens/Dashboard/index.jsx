import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList, SafeAreaView, Text, Image } from "react-native";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Components
import Navbar from "../../components/Navbar";
import ActivityCard from "../../components/ActivityCard";
import DashboardCard from "../../components/DashboardCard";

// Style
import styles from "./styles";

// Redux
import { fetchExpenses } from "../../slices/expenseSlice";
import { fetchIncomes } from "../../slices/incomeSlice";
import { fetchDebts } from "../../slices/debtSlice";

// Util
import { mergeAndSortItems } from "../../utils/utils";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const incomes = useSelector((state) => state.incomes.incomes);
  const debts = useSelector((state) => state.debts.debts);
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

  let incomeCalculated = currentMonthIncome.reduce((sum, income) => {
    return sum + income.income_amount;
  }, 0);

  const totalAmountOfIncome = incomeCalculated < 0 ? 0 : incomeCalculated;
  const reduced_income =
    incomeCalculated - totalAmountOfExpense < 0
      ? 0
      : incomeCalculated - totalAmountOfExpense;

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchIncomes());
    dispatch(fetchDebts());
  }, [dispatch]);

  const recentActivities = mergeAndSortItems(expenses, incomes, debts);

  const renderHeader = () => (
    <>
      <View style={styles.logo_container}>
        <Image
          source={require("../../assets/logo2.jpg")}
          style={styles.logo_image}
        />
        <MaterialIcons
          name="settings"
          size={28}
          color="#797979"
          style={{ marginRight: 20 }}
        />
      </View>
      <Navbar />
      <View style={styles.container_one}>
        <DashboardCard
          intro_text="Expenses as of"
          amount={totalAmountOfExpense}
          image={require("../../assets/costs.png")}
          color="#FC819E"
        />
      </View>
      <View style={styles.container_two}>
        <DashboardCard
          intro_text="Income as of"
          amount={totalAmountOfIncome}
          image={require("../../assets/income.png")}
          color="#00A9FF"
        />
      </View>
      <Text style={styles.text_one}>Recent Activities</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recentActivities}
        renderItem={({ item }) => <ActivityCard activity={item} />}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list_one}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
