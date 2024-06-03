import {
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  View,
  Text,
} from "react-native";
import { useSelector } from "react-redux";

// Styles
import styles from "./styles";

// Components
import AddNewExpense from "../../components/AddExpenseForm";
import ActivityCard from "../../components/ActivityCard";

const screenWidth = Dimensions.get("window").width;

export default function AddItem() {
  const expenses = useSelector((state) => state.expenses.expenses);

  const sortedExpenses = expenses.slice().sort((a, b) => {
    return new Date(b.expense_date_time) - new Date(a.expense_date_time);
  });

  const recentActivities = sortedExpenses.slice(0, 3);

  const renderForm = ({ item: { id } }) => (
    <>
      <View style={[styles.formContainer, { width: screenWidth - 36 }]}>
        {id === 0 && <AddNewExpense />}
        {id === 1 && <AddNewExpense />}
        {id === 2 && <AddNewExpense />}
      </View>
    </>
  );

  const renderRecentActivity = () => (
    <>
      <Text style={styles.text_two}>Recent Activities</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container_one}>
        <Text style={styles.text_one}>Add your activities here</Text>
      </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container_two}>
          <FlatList
            data={[{ id: 0 }, { id: 1 }, { id: 2 }]}
            renderItem={renderForm}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={screenWidth - 36} // Use screen width minus padding
            snapToAlignment="center"
            // style={styles.list_one}
            contentContainerStyle={styles.list_one}
          />
          <View style={styles.paginationContainer}>
            {Array.from({ length: 3 }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.paginationDot,
                  i === 0 && styles.paginationDotActive,
                ]}
              />
            ))}
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
