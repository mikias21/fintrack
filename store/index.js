import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../slices/expenseSlice";
import incomeReducer from "../slices/incomeSlice";
import debtReducer from "../slices/debtSlice";

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    incomes: incomeReducer,
    debts: debtReducer,
  },
});

export default store;
