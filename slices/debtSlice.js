import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  debts: [],
  loading: false,
  error: null,
};

// Async thunk to fetch debts
export const fetchDebts = createAsyncThunk(
  "debts/fetchDebts",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/debts`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(debt),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to add an debt
export const addDebt = createAsyncThunk(
  "debts/addDebt",
  async ({debt, token}, thunkAPI) => {
    try {
      const response = await fetch(
        "https://fintrack-api-gmpu.onrender.com/api/v1/debts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(debt),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete an debt
export const deleteDebt = createAsyncThunk(
  "debts/deleteDebt",
  async ({ debtID, token }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/debts/${debtID}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete debt");
      }

      return debtID; // Return the deleted debt ID for potential UI updates
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to pay off a debt
export const payDebt = createAsyncThunk(
  "debts/payDebt",
  async ({ debtID, debt_paid_amount, debt_paid_date, token }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/debts/pay/${debtID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ debt_paid_amount, debt_paid_date }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update debt");
      }

      const data = await response.json();
      return data; // Return the updated debt object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const debtSlice = createSlice({
  name: "debts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDebts.fulfilled, (state, action) => {
        state.loading = false;
        state.debts = action.payload;
      })
      .addCase(fetchDebts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addDebt.fulfilled, (state, action) => {
        state.debts.push(action.payload);
      })
      .addCase(deleteDebt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDebt.fulfilled, (state, action) => {
        const debtID = action.payload;
        state.debts = state.debts.filter((debt) => debt._id !== debtID);
        state.loading = false;
      })
      .addCase(deleteDebt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(payDebt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payDebt.fulfilled, (state, action) => {
        const updatedDebt = action.payload;
        const index = state.debts.findIndex(
          (debt) => debt._id === updatedDebt._id
        );
        if (index !== -1) {
          state.debts[index] = updatedDebt;
        }
        state.loading = false;
      })
      .addCase(payDebt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default debtSlice.reducer;
