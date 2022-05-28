import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import expenseReducer from "./expenses/expenseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
  },
});
