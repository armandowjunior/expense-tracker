import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerExpense } from "../features/expenses/expenseSlice";
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

  const onSubmit = (e) => {
    e.preventDefault();

    if (value === "0") {
      return toast.error("Please add a positive or negative value");
    }

    dispatch(
      registerExpense({
        desc,
        value,
        expenseDate: new Date(expenseDate + "T00:00:00"),
      })
    );
  };

  return (
    <section className="expense-form">
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="desc">Description</label>
        <div className="description-input">
          <input
            type="text"
            name="desc"
            id="description"
            value={desc}
            placeholder="Enter income or expense description"
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

        <button type="submit" className="btn expense-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ExpenseForm;
