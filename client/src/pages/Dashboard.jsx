import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ExpenseFilter from "../components/ExpenseFilter";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseItem from "../components/ExpenseItem";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { reset, getExpenses } from "../features/expenses/expenseSlice";
import { logout } from "../features/auth/authSlice";
import numberWithCommas from "../utils/numberWithCommas";
import greetings from "../utils/greetings";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { expenses, pending, error, errorMessage } = useSelector(
    (state) => state.expenses
  );

  // UseEffect para o get ser apenas na primeira renderização da página;
  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  // UseEffect para pegar erros;
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (error) {
      toast.error(errorMessage);
      if (errorMessage === "Not authorized") {
        dispatch(logout());
      }
      dispatch(reset());
    }

    return () => {};
  }, [user, dispatch, navigate, error, errorMessage]);

  if (pending) {
    return <Spinner />;
  }

  const totalAmount = expenses
    .map((expense) => expense.value)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const positiveAmount = expenses
    .map((expense) => expense.value)
    .filter((value) => value > 0)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const negativeAmount = expenses
    .map((expense) => expense.value)
    .filter((value) => value < 0)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  return (
    <>
      <section className="heading">
        {greetings()}, {user && user.name}!
      </section>

      <section className="balance">
        <p className="balance-title">Your Balance</p>
        <h2> {numberWithCommas(totalAmount)} </h2>
        <div className="income-expense">
          <p className="income"> +{numberWithCommas(positiveAmount)}</p>
          <p className="income-expense-dash">|</p>
          <p className="expense">
            {negativeAmount === 0 ? "-" : ""}
            {numberWithCommas(negativeAmount)}
          </p>
        </div>
      </section>

      <section className="expense-form">
        <ExpenseForm />
      </section>

      <section className="incomes-and-expenses">
        <h2 className="incomes-and-expenses-title">Incomes and Expenses</h2>

        {expenses.length > 0 ? (
          <>
            <ExpenseFilter />
            {expenses.map((expenses) => (
              <ExpenseItem key={expenses._id} expense={expenses} />
            ))}
          </>
        ) : (
          <div className="no-expenses">You don't have any expenses yet</div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
