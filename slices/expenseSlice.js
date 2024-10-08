import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

// Async thunk to fetch expenses
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/expenses`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to add an expense
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async ({expense, token}, thunkAPI) => {
    try {
      const response = await fetch(
        "https://fintrack-api-gmpu.onrender.com/api/v1/expenses/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(expense),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete an expense
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async ({ expenseID, token }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/expenses/${expenseID}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete expense");
      }

      return expenseID; // Return the deleted expense ID for potential UI updates
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        const expenseId = action.payload;
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== expenseId
        );
        state.loading = false;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default expenseSlice.reducer;
