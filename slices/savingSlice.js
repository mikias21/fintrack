import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  savings: [],
  savingDeductions: [],
  loading: false,
  error: null,
};

// Async thunk to fetch savings
export const fetchSavings = createAsyncThunk(
  "savings/fetchSavings",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/savings/`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to add a savings
export const addSaving = createAsyncThunk(
  "savings/addSaving",
  async ({saving, token}, thunkAPI) => {
    try {
      const response = await fetch(
        "https://fintrack-api-gmpu.onrender.com/api/v1/savings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(saving),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a saving
export const deleteSaving = createAsyncThunk(
  "savings/deleteSaving",
  async ({ savingID, token }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/savings/${savingID}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete saving");
      }

      return savingID; // Return the deleted saving ID for potential UI updates
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deductSaving = createAsyncThunk(
  "savings/deductSaving",
  async ({spending_amount, spending_date, spending_comment, token}, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/deduct/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({spending_amount, spending_date, spending_comment}),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch saving deductions
export const fetchSavingsDeductions = createAsyncThunk(
  "savings/fetchSavingDeductions",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/deduct/`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a deduction
export const deleteDeduction = createAsyncThunk(
  "savings/deleteDeduction",
  async ({ deductionID, token }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/deduct/${deductionID}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete deduction");
      }
      return deductionID;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const savingSlice = createSlice({
  name: "savings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavings.fulfilled, (state, action) => {
        state.loading = false;
        state.savings = action.payload;
      })
      .addCase(fetchSavings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSavingsDeductions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavingsDeductions.fulfilled, (state, action) => {
        state.loading = false;
        state.savingDeductions = action.payload;
      })
      .addCase(fetchSavingsDeductions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSaving.fulfilled, (state, action) => {
        state.savings.push(action.payload);
      })
      .addCase(deductSaving.fulfilled, (state, action) => {
        state.savingDeductions.push(action.payload);
      })
      .addCase(deleteSaving.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSaving.fulfilled, (state, action) => {
        const savingID = action.payload;
        state.savings = state.savings.filter(
          (saving) => saving._id !== savingID
        );
        state.loading = false;
      })
      .addCase(deleteSaving.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDeduction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeduction.fulfilled, (state, action) => {
        const deductionID = action.payload;
        state.savingDeductions = state.savingDeductions.filter(
          (deduction) => deduction._id !== deductionID
        );
        state.loading = false;
      })
      .addCase(deleteDeduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default savingSlice.reducer;
