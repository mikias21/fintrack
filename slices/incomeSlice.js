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
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://fintrack-api-gmpu.onrender.com/api/v1/incomes/"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to add an expense
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
      });
  },
});

export default incomeSlice.reducer;
