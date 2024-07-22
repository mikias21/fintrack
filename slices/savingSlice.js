import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  savings: [],
  loading: false,
  error: null,
};

// Async thunk to fetch savings
export const fetchSavings = createAsyncThunk(
  "savings/fetchSavings",
  async (userID, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/savings/${userID}`
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
  async (saving, thunkAPI) => {
    try {
      const response = await fetch(
        "https://fintrack-api-gmpu.onrender.com/api/v1/savings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
  async ({ savingID, userID }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/savings/${savingID}/${userID}`,
        {
          method: "DELETE",
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
  async (spending, thunkAPI) => {
    try {
      const spendingData = {
        spending_amount: spending.spending_amount,
        spending_date: spending.spending_date,
        spending_comment: spending.spending_comment,
      };
      const response = await fetch(
        `https://fintrack-api-gmpu.onrender.com/api/v1/saving/deduct/${spending.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(spendingData),
        }
      );
      const data = await response.json();
      return data;
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
      .addCase(addSaving.fulfilled, (state, action) => {
        state.savings.push(action.payload);
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
      });
  },
});

export default savingSlice.reducer;
