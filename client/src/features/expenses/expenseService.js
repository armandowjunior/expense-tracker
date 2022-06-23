import axios from "axios";

const API_URL = "/api/expenses/";

//@desc Get expenses from user
//@access PRIVATE
const getExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL, config);

  return res.data;
};

//@desc Get expenses from user using a query
//@access PRIVATE
const getExpensesFiltered = async (token, queryData) => {
  const { year, month } = queryData;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(
    API_URL + `filter?year=${year}&month=${month}`,
    config
  );

  return res.data;
};

//@desc Delete expense from user
//@access PRIVATE
const deleteExpense = async (token, expenseId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(API_URL + expenseId, config);

  return res.data;
};

//@desc Register new expense
//@access PRIVATE
const registerExpense = async (token, expenseData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, expenseData, config);

  return res.data;
};

const expenseService = {
  getExpenses,
  getExpensesFiltered,
  deleteExpense,
  registerExpense,
};

export default expenseService;
