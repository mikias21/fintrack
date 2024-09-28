import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storeToken } from "../utils/storage";

// Initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk to signup a user
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (user, thunkAPI) => {
    try {
      const response = await fetch(
        "https://fintrack-api-gmpu.onrender.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to signIn a user
export const signinUser = createAsyncThunk(
  "user/signinUser",
  async (user, thunkAPI) => {
    try {
      const response = await fetch(
        "https://fintrack-api-gmpu.onrender.com/api/v1/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      storeToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to signIn a user
export const verifyToken = createAsyncThunk(
  "user/verifyToken",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        "https://fintrack-api-gmpu.onrender.com/api/v1/auth/verify",
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      let userData = await response.json();
      userData = {...userData, 'token': token}
      return userData
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.user = {user_name: action.payload.user_name, _id: action.payload.id};
      state.token = action.payload.token;
    });
    builder.addCase(signinUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
