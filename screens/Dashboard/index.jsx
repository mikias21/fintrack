import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { BarChart } from "react-native-gifted-charts";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Components
import Navbar from "../../components/Navbar";
import ActivityCard from "../../components/ActivityCard";
import DashboardCard from "../../components/DashboardCard";
import DebtActivityCard from "../../components/DebtActivityCard";

// Style
import styles from "./styles";

// Redux
import { fetchExpenses } from "../../slices/expenseSlice";
import { fetchIncomes } from "../../slices/incomeSlice";
import { fetchDebts } from "../../slices/debtSlice";
import { logout } from "../../slices/userSlice";

// Util
import { mergeAndSortItems } from "../../utils/utils";

import {
  startOfWeek,
  endOfWeek,
  parseISO,
  format,
  isWithinInterval,
} from "date-fns";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const expenses = useSelector((state) => state.expenses.expenses);
  const incomes = useSelector((state) => state.incomes.incomes);
  const debts = useSelector((state) => state.debts.debts);
  const savings = useSelector((state) => state.savings.savings);
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
    dispatch(fetchExpenses(user._id));
    dispatch(fetchIncomes(user._id));
    dispatch(fetchDebts(user._id));
  }, [dispatch]);

  const recentActivities = mergeAndSortItems(expenses, incomes, debts);

  const handleLogout = () => {
    dispatch(logout());
  };

  const getFrontColor = (amount) => {
    if (amount <= 100) return "#9FBB73";
    if (amount <= 300) return "#FB8B24";
    return "#F7418F";
  };

  const aggregateWeeklyExpenses = (data) => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Week starts on Monday
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const daysOfWeek = ["Mon", "Thu", "Wed", "Thur", "Fri", "Sat", "Sun"];
    const aggregatedData = Array(7).fill(0);

    data.forEach((item) => {
      const expenseDate = parseISO(item.expense_date);
      if (isWithinInterval(expenseDate, { start: weekStart, end: weekEnd })) {
        const dayIndex = expenseDate.getDay() - 1;
        aggregatedData[dayIndex] += item.expense_amount;
      }
    });

    return aggregatedData.map((value, index) => ({
      value,
      label: daysOfWeek[index],
      frontColor: getFrontColor(value),
      topLabelComponent: () => (
        <Text
          style={{
            color: "#3E3232",
            fontSize: 10,
            marginBottom: 2,
            fontWeight: "800",
          }}
        >
          {value}
        </Text>
      ),
    }));
  };

  const barData = aggregateWeeklyExpenses(expenses);

  const renderHeader = () => (
    <>
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
      <Text style={styles.text_one}>Weekly expense Summary</Text>
      <View style={styles.bar_chart_container}>
        <BarChart
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          frontColor="lightgray"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
          hideYAxisText
          initialSpacing={10}
          // barMarginBottom={10}
          // barMarginTop={20}
          // isAnimated
          // isThreeD
          // height={120}
        />
      </View>
      <Text style={styles.text_one}>Recent Activities</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main_logo_container}>
        <View style={styles.logo_container}>
          <TouchableOpacity onPress={handleLogout}>
            <Image
              source={require("../../assets/icon.png")}
              style={styles.logo_image}
            />
          </TouchableOpacity>
          <MaterialIcons
            name="settings"
            size={28}
            color="#797979"
            style={{ marginRight: 20 }}
          />
        </View>
      </View>
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
