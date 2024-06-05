import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../slices/expenseSlice";
import incomeReducer from "../slices/incomeSlice";

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    incomes: incomeReducer,
  },
});

export default store;
