import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

// Verifica se o user existe no localStorage e não está vazio, se existir popula o state.user
// no início com o que existe no localStorage, se não, limpa o localStorage;
let user;

try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (error) {
  toast.error("An error occurred, please try again later");
  console.log(error);
  localStorage.removeItem("user");
}

const initialState = {
  user: user ? user : null,
  pending: false,
  error: false,
  errorMessage: "",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.errorMessage = "";
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.pending = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.pending = false;
      state.user = null;
      state.error = true;
      state.errorMessage = action.payload;
    },
    [loginUser.pending]: (state) => {
      state.pending = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.pending = false;
      state.user = null;
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
