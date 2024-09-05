import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
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
import ExpenseActivityCard from "../../components/ExpenseActivityCard";
import IncomeAcivityCard from "../../components/IncomeActivityCard";
import SavingActivityCard from "../../components/SavingsActivityCard";

// Style
import styles from "./styles";

// Redux
import { fetchExpenses } from "../../slices/expenseSlice";
import { fetchIncomes } from "../../slices/incomeSlice";
import { fetchDebts } from "../../slices/debtSlice";
import { fetchSavings } from "../../slices/savingSlice";
import { fetchSavingsDeductions } from "../../slices/savingSlice";
import { logout } from "../../slices/userSlice";

// Util
import { mergeAndSortItems } from "../../utils/utils";

import { deleteToken } from "../../utils/storage";

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
  const expenses = useSelector((state) => state.expenses?.expenses || []);
  const incomes = useSelector((state) => state.incomes?.incomes || []);
  const debts = useSelector((state) => state.debts?.debts || []);
  const savings = useSelector((state) => state.savings?.savings || []);
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

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

  const latestExpenses = getTwoLatestExpenses(expenses);
  const latestIncomes = getTwoLatestIncomes(incomes);
  const latestDebts = getTwoLatestDebts(debts);
  const latestSavings = getTwoLatestSavings(savings);
  const combinedLatestInfo = [...latestExpenses, ...latestIncomes, ...latestDebts, ...latestSavings];

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = dayjs(expense.expense_date);
    return (
      expenseDate.month() === currentMonth && expenseDate.year() === currentYear
    );
  });

  const currentMonthIncome = incomes.filter((income) => {
    const incomeDate = dayjs(income.income_date);
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
    if(user?.token){
      try{
        dispatch(fetchExpenses(user?.token));
        dispatch(fetchIncomes(user?.token));
        dispatch(fetchDebts(user?.token));
        dispatch(fetchSavings(user?.token));
        dispatch(fetchSavingsDeductions(user?.token));
      }catch(error){
        navigation.push('Login')
      }
    }
  }, [dispatch, user?.token]);

  const handleLogout = async () => {
    await deleteToken();
    dispatch(logout())
  };

  const getFrontColor = (amount) => {
    if (amount <= 100) return "#9FBB73";
    if (amount <= 300) return "#FB8B24";
    return "#F7418F";
  };

  const aggregateWeeklyExpenses = (data) => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 0 }); // Week starts on Sunday
    const weekEnd = endOfWeek(now, { weekStartsOn: 0 });
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const aggregatedData = Array(7).fill(0);
  
    data.forEach((item) => {
      const expenseDate = parseISO(item.expense_date);
      if (isWithinInterval(expenseDate, { start: weekStart, end: weekEnd })) {
        const dayIndex = expenseDate.getDay(); 
        aggregatedData[dayIndex] += item.expense_amount;
      }
    });
  
    return aggregatedData.map((value, index) => {
      return {
        value: value,
        label: daysOfWeek[index],
        frontColor: getFrontColor(value),
        topLabelComponent: () => (
          <Text
            style={{
              color: "#3E3232",
              fontSize: 8,
              marginBottom: 2,
              fontWeight: "900",
            }}
          >
            {value} &#165;
          </Text>
        ),
      };
    });
  };

  const barData = aggregateWeeklyExpenses(expenses);
  const allValuesAreZero = barData.every((data) => data.value === 0);

  const renderHeader = () => (
    <>

      <View style={styles.main_logo_container}>
        <View style={styles.logo_container}>
          <TouchableOpacity onPress={handleLogout}>
            <Navbar user={user}/>
          </TouchableOpacity>
          <MaterialIcons
            name="settings"
            size={28}
            color="#797979"
            style={{ marginRight: 20 }}
          />
        </View>
      </View>

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

      {!allValuesAreZero ? (
        <>
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
            />
          </View>
        </>
      ) : (<></>)}
      <Text style={styles.text_one}>Recent Activities</Text>

    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={combinedLatestInfo}
        renderItem={({ item }) => {
          if (item?.update_from === "EXP") {
            return <ExpenseActivityCard activity={item} />;
          } else if (item?.update_from === "INC") {
            return <IncomeAcivityCard activity={item} />;
          } else if (item?.update_from === "DEBT"){
            return <DebtActivityCard activity={item}/>
          } else if (item?.update_from === "SAVE"){
            return <SavingActivityCard activity={item} />
          } else {
            return null;
          }
        }}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list_one}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
    </SafeAreaView>
  );
}
