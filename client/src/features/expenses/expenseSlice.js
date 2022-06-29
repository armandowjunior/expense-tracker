import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenseService from "./expenseService";

const initialState = {
  expenses: [],
  pending: false,
  error: false,
  errorMessage: "",
  filter: false,
  filterData: "",
  yearsToFilter: [],
};

export const getExpenses = createAsyncThunk(
  "expenses/getExpenses",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await expenseService.getExpenses(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getExpensesYears = createAsyncThunk(
  "expenses/getExpensesYears",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await expenseService.getExpensesYears(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getExpensesFiltered = createAsyncThunk(
  "expenses/getExpensesFiltered",
  async (queryData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await expenseService.getExpensesFiltered(token, queryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (expenseId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await expenseService.deleteExpense(token, expenseId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const registerExpense = createAsyncThunk(
  "expenses/registerExpense",
  async (expenseData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await expenseService.registerExpense(token, expenseData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [getExpenses.pending]: (state) => {
      state.pending = true;
    },
    [getExpenses.fulfilled]: (state, action) => {
      state.pending = false;
      state.expenses = action.payload;
      state.filter = false;
    },
    [getExpenses.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
      state.filter = false;
    },
    [getExpensesYears.pending]: (state) => {
      state.pending = true;
    },
    [getExpensesYears.fulfilled]: (state, action) => {
      state.pending = false;
      state.yearsToFilter = action.payload;
    },
    [getExpensesYears.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    [getExpensesFiltered.pending]: (state) => {
      state.pending = true;
    },
    [getExpensesFiltered.fulfilled]: (state, action) => {
      state.pending = false;
      state.expenses = action.payload;
      state.filter = true;
      state.filterData = action.meta.arg;
    },
    [getExpensesFiltered.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
      state.filter = false;
    },
    [deleteExpense.pending]: (state) => {
      state.pending = true;
    },
    [deleteExpense.fulfilled]: (state, action) => {
      state.pending = false;
      state.expenses = state.expenses.filter(
        (expense) => expense._id !== action.payload.id
      );
    },
    [deleteExpense.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    [registerExpense.pending]: (state) => {
      state.pending = true;
    },
    [registerExpense.fulfilled]: (state, action) => {
      state.pending = false;
      state.expenses.unshift(action.payload);
    },
    [registerExpense.rejected]: (state, action) => {
      state.pending = false;
      state.filter = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { reset } = expenseSlice.actions;
export default expenseSlice.reducer;
