import { useEffect, useState } from "react";

import { database } from "../db/connection";

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        await database.dropDatabaseTablesAsync();
        await database.setupDatabaseAsync();
        await database.setupExpensesAsync();

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}
