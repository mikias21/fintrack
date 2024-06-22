import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  incomes: [],
  loading: false,
  error: null,
};

// Async thunk to fetch incomes
export const fetchIncomes = createAsyncThunk(
  "incomes/fetchIncomes",
  async (user_id, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/incomes/${user_id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to add an income
export const addIncome = createAsyncThunk(
  "incomes/addIncome",
  async (income, thunkAPI) => {
    try {
      const response = await fetch(
        "https://fintrack-api-gmpu.onrender.com/api/v1/incomes/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(income),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete an income
export const deleteIncome = createAsyncThunk(
  "incomes/deleteIncome",
  async ({ incomeID, userID }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/incomes/${incomeID}/${userID}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to delete income");
      }

      return incomeID; // Return the deleted income ID for potential UI updates
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const incomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.incomes.push(action.payload);
      })
      .addCase(deleteIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        const incomeID = action.payload;
        state.incomes = state.incomes.filter(
          (income) => income._id !== incomeID
        );
        state.loading = false;
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default incomeSlice.reducer;
