import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../slices/expenseSlice";
import incomeReducer from "../slices/incomeSlice";
import debtReducer from "../slices/debtSlice";
import savingReducer from "../slices/savingSlice";

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    incomes: incomeReducer,
    debts: debtReducer,
    savings: savingReducer,
  },
});

export default store;
