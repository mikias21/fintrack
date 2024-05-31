// db connection
import { getDBConnection } from "../db/connection";

export default async function createExpensesTable() {
  const db = await getDBConnection();

  const query = `
        CREATE TABLE IF NOT EXISTS expenses_data (
            expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
            expense_amount REAL NOT NULL,
            expense_date TEXT NOT NULL,
            reason TEXT NOT NULL,
            comment TEXT,
            expense_added_date_time TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL           
        )
    `;

  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to create tables`);
  }
}
