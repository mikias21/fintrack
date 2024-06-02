import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import dayjs from "dayjs";

// Style
import styles from "./styles";

export default function AddNew() {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(dayjs());
  const [expenseReason, setExpenseReason] = useState("");
  const [expenseComment, setExpenseComment] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isDateTimePickerVisible, setisDateTimePickerVisible] = useState(false);

  const db = SQLite.openDatabaseSync("fintrack.db");

  useEffect(() => {
    initExpenseTable();
    loadExpensesData();
  }, []);

  const showDateTimePicker = () => {
    setisDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setisDateTimePickerVisible(false);
  };

  const handleDatePicked = (date) => {
    setExpenseDate(dayjs(date).format("YYYY-MM-DD"));
    this.hideDateTimePicker();
  };

  const initExpenseTable = () => {
    db.execSync(
      `CREATE TABLE IF NOT EXISTS expenses_data (
        expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
        expense_amount REAL NOT NULL,
        expense_date TEXT NOT NULL,
        reason TEXT NOT NULL,
        comment TEXT,
        expense_added_date_time TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL
      )`
    );
  };

  const loadExpensesData = async () => {
    // Use async/await if applicable
    try {
      const all = await db.getAllSync("SELECT * FROM expenses_data"); // Handle potential errors
      setExpenses(all);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async () => {
    try {
      const res = await db.runAsync(
        "INSERT INTO expenses_data(expense_amount, expense_date, reason, comment) VALUES (?, ?, ?, ?)",
        expenseAmount,
        expenseDate,
        expenseReason,
        expenseComment
      );

      setExpenseAmount("");
      setExpenseDate("");
      setExpenseReason("");
      setExpenseComment("");
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

  const renderForm = ({ item: { id } }) => (
    <View style={styles.formContainer}>
      {id === 0 && (
        <>
          <View style={styles.container_two}>
            <Text style={styles.text_two}>Add Expense</Text>
            <TextInput
              style={styles.input}
              placeholder="Expense Amount *"
              keyboardType="numeric"
              value={expenseAmount}
              onChangeText={setExpenseAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Expense Date (YYYY-MM-DD) *"
              value={expenseDate}
              onChangeText={setExpenseDate}
              onFocus={() => showDateTimePicker()}
            />
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={handleDatePicked}
              onCancel={hideDateTimePicker}
            />
            <TextInput
              style={styles.input}
              placeholder="Reason *"
              value={expenseReason}
              onChangeText={setExpenseReason}
            />
            <TextInput
              style={[styles.input, { height: 60 }]}
              placeholder="Comment (optional)"
              value={expenseComment}
              onChangeText={setExpenseComment}
            />
            {/* <Button title="Add Expense" onPress={handleAddExpense} /> */}
            <Pressable onPress={handleAddExpense} style={styles.button_one}>
              <Text style={styles.text_three}>&#x2713;</Text>
            </Pressable>
          </View>
        </>
      )}
      {id === 1 && (
        <>
          <View style={styles.container_three}>
            <Text style={styles.text_two}>Add Income</Text>
            <TextInput
              style={styles.input}
              placeholder="Expense Amount *"
              keyboardType="numeric"
              value={expenseAmount}
              onChangeText={setExpenseAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Expense Date (YYYY-MM-DD) *"
              value={expenseDate}
              onChangeText={setExpenseDate}
              onFocus={() => showDateTimePicker()}
            />
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={handleDatePicked}
              onCancel={hideDateTimePicker}
            />
            <TextInput
              style={styles.input}
              placeholder="Reason *"
              value={expenseReason}
              onChangeText={setExpenseReason}
            />
            <TextInput
              style={[styles.input, { height: 60 }]}
              placeholder="Comment (optional)"
              value={expenseComment}
              onChangeText={setExpenseComment}
            />
            {/* <Button title="Add Expense" onPress={handleAddExpense} /> */}
            <Pressable onPress={handleAddExpense} style={styles.button_one}>
              <Text style={styles.text_three}>&#x2713;</Text>
            </Pressable>
          </View>
        </>
      )}
      {id === 2 && (
        <View style={styles.container_four}>
          <Text style={styles.text_two}>Add Debt</Text>
          <TextInput
            style={styles.input}
            placeholder="Expense Amount *"
            keyboardType="numeric"
            value={expenseAmount}
            onChangeText={setExpenseAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Expense Date (YYYY-MM-DD) *"
            value={expenseDate}
            onChangeText={setExpenseDate}
            onFocus={() => showDateTimePicker()}
          />
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
          />
          <TextInput
            style={styles.input}
            placeholder="Reason *"
            value={expenseReason}
            onChangeText={setExpenseReason}
          />
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Comment (optional)"
            value={expenseComment}
            onChangeText={setExpenseComment}
          />
          {/* <Button title="Add Expense" onPress={handleAddExpense} /> */}
          <Pressable onPress={handleAddExpense} style={styles.button_one}>
            <Text style={styles.text_three}>&#x2713;</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container_one}>
          <Text style={styles.text_one}>Add your activities here</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <FlatList
            data={[{ id: 0 }, { id: 1 }, { id: 2 }]}
            renderItem={renderForm}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval
            snapToStart
            onScrollEnd={({ nativeEvent }) => {
              // Update pagination based on currentIndex (optional)
            }}
            ListFooterComponent={() => <View style={styles.listFooter} />}
          />
          <View style={styles.paginationContainer}>
            {Array.from({ length: 3 }, (_, i) => (
              <View
                key={i}
                style={[styles.paginationDot, styles.paginationDotActive]}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
