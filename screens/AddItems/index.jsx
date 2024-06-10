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

// Styles
import styles from "./styles";

// Components
import AddNewExpense from "../../components/AddExpenseForm";
import AddIncomeForm from "../../components/AddIncomeForm";
import AddDebtForm from "../../components/AddDebtForm";
import ActivityCard from "../../components/ActivityCard";

const screenWidth = Dimensions.get("window").width;

export default function AddItem() {
  const expenses = useSelector((state) => state.expenses.expenses);
  const incomes = useSelector((state) => state.incomes.incomes);
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);

  const sortedExpenses = expenses.slice().sort((a, b) => {
    return new Date(b.expense_date_time) - new Date(a.expense_date_time);
  });

  const sortedIncomes = incomes.slice().sort((a, b) => {
    return new Date(b.income_date_time) - new Date(a.income_date_time);
  });

  const recentActivities = sortedExpenses.slice(0, 3);

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
    </View>
  );

  const renderRecentActivity = ({ item }) => <ActivityCard activity={item} />;

  const paginationDots = Array.from({ length: 3 }, (_, i) => (
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
      <FlatList
        data={[{ key: "header" }, { key: "content" }]}
        renderItem={({ item }) => {
          if (item.key === "header") {
            return (
              <>
                <View style={styles.container_one}>
                  <Image
                    source={require("../../assets/online-transfer.png")}
                    style={styles.header_image}
                  />
                  <Text style={styles.text_one}>Activities</Text>
                </View>
                <View style={styles.container_two}>
                  <FlatList
                    ref={flatListRef}
                    data={[{ id: 0 }, { id: 1 }, { id: 2 }]}
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
                  renderItem={renderRecentActivity}
                  keyExtractor={(item) => item._id}
                  contentContainerStyle={styles.list_two}
                />
              </>
            );
          }
          return null;
        }}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
