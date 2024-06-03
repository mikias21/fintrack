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

export default function HomeScreen() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = dayjs(expense.expense_date_time);
    return (
      expenseDate.month() === currentMonth && expenseDate.year() === currentYear
    );
  });

  const totalAmountOfExpense = currentMonthExpenses.reduce((sum, expense) => {
    return sum + expense.expense_amount;
  }, 0);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const renderHeader = () => (
    <>
      <View style={styles.logo_container}>
        <Image
          source={require("../../assets/logo2.jpg")}
          style={styles.logo_image}
        />
        <MaterialIcons
          name="dark-mode"
          size={28}
          color="black"
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
          intro_text="Saving as of"
          amount="2000"
          image={require("../../assets/piggy-bank.png")}
          color="#00A9FF"
        />
      </View>
      <Text style={styles.text_one}>Recent Activities</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => <ActivityCard activity={item} />}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list_one}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
