import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  deleteExpense,
  getExpensesYears,
} from "../features/expenses/expenseSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ExpenseItem = (expenses) => {
  const dispatch = useDispatch();

  const { _id, desc, value, expenseDate } = expenses.expense;

  const onClick = () => {
    confirmAlert({
      title: "Are you sure you want to delete it?",
      message: "Confirm to submit",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await dispatch(deleteExpense(_id));
            dispatch(getExpensesYears());
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="expense-item">
      <div className="expense-desc-value">
        <p className="desc-text">{desc}</p>
        <p className={value > 0 ? "value-positive" : "value-negative"}>
          $ {(value > 0 ? "+" : "") + value.toLocaleString()}
        </p>
      </div>
      <p className="expense-date">
        {new Date(expenseDate).toUTCString().slice(0, 16)}
      </p>
      <FaTrashAlt className="delete-btn" onClick={onClick} />
    </div>
  );
};

export default ExpenseItem;
