import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../../api/auth.api";
import { setAccessToken, removeAccessToken } from "../../utils/token";

const initialState = {
  user: null,

  accessToken: null,

  isAuthenticated: false,

  loading: false,

  error: null,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await loginUser(data);
    if (response.data?.data?.accessToken) {
      setAccessToken(response.data.data.accessToken);
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk(
  "auth/register",

  async (data, thunkAPI) => {
    try {
      const response = await registerUser(data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/me",

  async (_, thunkAPI) => {
    try {
      const response = await getCurrentUser();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",

  async (refreshToken, thunkAPI) => {
    try {
      await logoutUser(refreshToken);
      removeAccessToken();
    } catch (error) {
      removeAccessToken();
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.data.user;

        state.accessToken = action.payload.data.accessToken;

        state.isAuthenticated = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message;
      })

        
      .addCase(fetchCurrentUser.pending, (state) => {

          state.loading = true;

      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {

          state.loading = false;

          state.user = action.payload.data;

          state.isAuthenticated = true;

      })

      .addCase(fetchCurrentUser.rejected, (state) => {

          state.loading = false;

          state.user = null;

          state.isAuthenticated = false;

      })


      .addCase(logout.fulfilled, (state) => {
        state.user = null;

        state.accessToken = null;

        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
