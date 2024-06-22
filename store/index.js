import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../slices/expenseSlice";
import incomeReducer from "../slices/incomeSlice";
import debtReducer from "../slices/debtSlice";
import savingReducer from "../slices/savingSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    incomes: incomeReducer,
    debts: debtReducer,
    savings: savingReducer,
    user: userReducer,
  },
});

export default store;
