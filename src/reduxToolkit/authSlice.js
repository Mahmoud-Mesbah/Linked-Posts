import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../api/axiosInstance";
import toast from "react-hot-toast";
import { safeGetJSON } from "../utils/storage";

const initialState = {
  loading: false,
  error: null,
  user: safeGetJSON("user"),
};

//! ================= REGISTER =================
export const registerUser = createAsyncThunk("auth/registerUser",
  async (values, thunkAPI) => {
    try {
      const { data } = await api.post("/users/signup", values);

      toast.success("Account Created Successfully");

      return data;

    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || "Failed");

      return thunkAPI.rejectWithValue(error.response?.data?.error || error.response?.data?.message);
    }
  }
);

//! ================= LOGIN =================
export const loginUser = createAsyncThunk("auth/loginUser",
  async (values, thunkAPI) => {
    try {
      const { data } = await api.post("/users/signin", values);

      console.log("LOGIN RESPONSE:", data);


      const token = data.token || data.data?.token;

      const user = data.user || data.data?.user;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Welcome Back");

      return { token, user, };

    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || "Failed");
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.response?.data?.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      }
      )

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      }
      )

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
      )


      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      }
      )

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      }
      )

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;