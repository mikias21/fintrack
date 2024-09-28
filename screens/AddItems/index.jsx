import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

// Styles
import styles from "./styles";

// Components
import AddNewExpense from "../../components/AddExpenseForm";
import AddIncomeForm from "../../components/AddIncomeForm";
import AddSavingsForm from "../../components/AddSavingForm";
import AddDebtForm from "../../components/AddDebtForm";
import ActivityCard from "../../components/ActivityCard";
import DebtActivityCard from "../../components/DebtActivityCard";
import ExpenseActivityCard from "../../components/ExpenseActivityCard";
import IncomeAcivityCard from "../../components/IncomeActivityCard";
import SavingActivityCard from "../../components/SavingsActivityCard";

const screenWidth = Dimensions.get("window").width;

export default function AddItem() {
  const expenses = useSelector((state) => state.expenses.expenses);
  const incomes = useSelector((state) => state.incomes.incomes);
  const debts = useSelector((state) => state.debts?.debts || []);
  const savings = useSelector((state) => state.savings?.savings || []);
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);

  const sortedExpenses = expenses.slice().sort((a, b) => {
    return new Date(a.expense_date_time) - new Date(b.expense_date_time);
  });

  const sortedIncomes = incomes.slice().sort((a, b) => {
    return new Date(a.income_date_time) - new Date(b.income_date_time);
  });

  const sortedDebts = debts.slice().sort((a, b) => {
    return new Date(a.debt_date_time) - new Date(b.debt_date_time);
  });

  const sortedSavings = savings.slice().sort((a, b) => {
    return new Date(a.saving_date_time) - new Date(b.saving_date_time);
  });

  const latestExpense = sortedExpenses[sortedExpenses.length - 1];
  const latestIncome = sortedIncomes[sortedIncomes.length - 1];
  const latestSaving = sortedSavings[sortedSavings.length - 1];
  const latestDebt = sortedDebts[sortedDebts.length - 1];

  let recentActivities = [latestExpense, latestIncome, latestSaving, latestDebt];

  const handlePagination = (page) => {
    setCurrentPage(page);
    flatListRef.current.scrollToIndex({ animated: true, index: page });
  };

  const onMomentumScrollEnd = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (screenWidth - 36)
    );
    setCurrentPage(index);
  };

  const renderForm = ({ item: { id } }) => (
    <View style={[styles.formContainer, { width: screenWidth - 36 }]}>
      {id === 0 && <AddNewExpense />}
      {id === 1 && <AddIncomeForm />}
      {id === 2 && <AddDebtForm />}
      {id === 3 && <AddSavingsForm />}
    </View>
  );

  const renderRecentActivity = ({ item }) => <ActivityCard activity={item} />;

  const paginationDots = Array.from({ length: 4 }, (_, i) => (
    <TouchableOpacity
      key={i}
      onPress={() => handlePagination(i)}
      style={styles.touchableArea}
    >
      <View
        style={[
          styles.paginationDot,
          currentPage === i && styles.paginationDotActive,
        ]}
      />
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_main_one}>
        <View style={styles.container_one}>
          <Image
            source={require("../../assets/online-transfer.png")}
            style={styles.header_image}
          />
          <Text style={styles.text_one}>Activities</Text>
        </View>
      </View>
      <FlatList
        data={[{ key: "header" }, { key: "content" }]}
        renderItem={({ item }) => {
          if (item.key === "header") {
            return (
              <>
                <View style={styles.container_two}>
                  <FlatList
                    ref={flatListRef}
                    data={[{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]}
                    renderItem={renderForm}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled
                    snapToInterval={screenWidth - 36}
                    snapToAlignment="center"
                    contentContainerStyle={styles.list_one}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    bounces={false}
                    scrollEventThrottle={16}
                    onScroll={(event) => {
                      const offsetY = event.nativeEvent.contentOffset.y;
                      if (offsetY !== 0) {
                        flatListRef.current.scrollToOffset({
                          offset: 0,
                          animated: false,
                        });
                      }
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 20,
                    }}
                  >
                    {paginationDots}
                  </View>
                </View>
              </>
            );
          } else if (item.key === "content") {
            return (
              <>
                <Text style={styles.text_two}>Recent Activities</Text>
                <FlatList
                  data={recentActivities}
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
                  keyExtractor={(item, index) => (item?._id ? item._id.toString() : index.toString())}
                  contentContainerStyle={styles.list_two}
                />
                <View style={styles.list_two_footer}></View>
              </>
            );
          }
          return null;
        }}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
    </SafeAreaView>
  );
}
