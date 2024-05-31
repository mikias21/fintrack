import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import { SafeAreaView, TextInput, View, Button, Text } from "react-native";

// Style
import styles from "./styles";

export default function AddNew() {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseReason, setExpenseReason] = useState("");
  const [expenseComment, setExpenseComment] = useState("");
  const [expenses, setExpenses] = useState([]);

  const db = SQLite.openDatabaseSync("fintrack.db");

  useEffect(() => {
    initExpenseTable();
    loadExpensesData();
  }, []);

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
      console.log(res);

      setExpenseAmount("");
      setExpenseDate("");
      setExpenseReason("");
      setExpenseComment("");
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_one}>
        <TextInput
          style={styles.input}
          placeholder="Expense Amount"
          keyboardType="numeric"
          value={expenseAmount}
          onChangeText={setExpenseAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Expense Date (YYYY-MM-DD)"
          value={expenseDate}
          onChangeText={setExpenseDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Reason"
          value={expenseReason}
          onChangeText={setExpenseReason}
        />
        <TextInput
          style={styles.input}
          placeholder="Comment"
          value={expenseComment}
          onChangeText={setExpenseComment}
        />
        <Button title="Add Expense" onPress={handleAddExpense} />
      </View>
    </SafeAreaView>
  );
}
