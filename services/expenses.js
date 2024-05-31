import * as SQLite from "expo-sqlite";
import { openDatabase } from "../db/connection";

async function insertData(data) {
  await openDatabase(); // Open the database if not already open
  await SQLite.transactionAsync((db) => {
    // Use transactionAsync
    db.executeSql(
      // Use executeSql for statements
      `INSERT INTO expenses_data (expense_amount, expense_date, reason, comment) VALUES (?, ?, ?, ?)`,
      [
        data.expense_amount,
        data.expense_date,
        data.expenseReason,
        data.expenseComment,
      ]
    );
  });
}

export { insertData };
