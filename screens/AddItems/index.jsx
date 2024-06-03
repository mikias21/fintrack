import {
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";

// Styles
import styles from "./styles";

// Components
import AddNewExpense from "../../components/AddExpenseForm";
import AddIncomeForm from "../../components/AddIncomeForm";
import ActivityCard from "../../components/ActivityCard";

const screenWidth = Dimensions.get("window").width;

export default function AddItem() {
  const expenses = useSelector((state) => state.expenses.expenses);
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);

  const sortedExpenses = expenses.slice().sort((a, b) => {
    return new Date(b.expense_date_time) - new Date(a.expense_date_time);
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
    <>
      <View style={[styles.formContainer, { width: screenWidth - 36 }]}>
        {id === 0 && <AddNewExpense />}
        {id === 1 && <AddIncomeForm />}
        {id === 2 && <AddNewExpense />}
      </View>
    </>
  );

  const renderRecentActivity = () => (
    <>
      <Text style={styles.text_two}>Recent Activities</Text>
    </>
  );

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
      <ScrollView showsVerticalScrollIndicator={false}>
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
