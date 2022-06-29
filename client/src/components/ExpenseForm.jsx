import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  registerExpense,
  getExpensesYears,
} from "../features/expenses/expenseSlice";
import { toast } from "react-toastify";

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    desc: "",
    value: "",
    expenseDate: "",
  });

  const { desc, value, expenseDate } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (value === "0") {
      return toast.error("Please add a positive or negative value");
    }

    await dispatch(
      registerExpense({
        desc,
        value,
        expenseDate,
      })
    );

    dispatch(getExpensesYears());
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset className="expense-fieldset">
        <legend>Enter Income or Expense Information</legend>
        <label htmlFor="description">Description</label>
        <div className="description-input">
          <input
            type="text"
            name="desc"
            id="description"
            value={desc}
            placeholder="Enter description"
            onChange={onChange}
            required
          />
        </div>
        <div className="value-date">
          <label htmlFor="value">Value</label>
          <label htmlFor="expenseDate">Date</label>
        </div>
        <div className="value-date">
          <input
            type="number"
            name="value"
            id="value"
            value={value}
            placeholder="Enter value"
            onChange={onChange}
            required
          />

          <input
            type="date"
            name="expenseDate"
            id="expenseDate"
            value={expenseDate}
            onChange={onChange}
            required
          />
        </div>
      </fieldset>

      <button type="submit" className="btn expense-btn">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
