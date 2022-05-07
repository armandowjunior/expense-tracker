import { useState } from "react";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    value: "",
    date: "",
  });

  const { description, value, date } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="expense-form">
      <form className="form">
        <label htmlFor="description">Description</label>
        <div className="description-input">
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            placeholder="Enter income or expense description"
            onChange={onChange}
          />
        </div>
        <div className="value-date">
          <label htmlFor="value">Value</label>
          <label htmlFor="date">Date</label>
        </div>
        <div className="value-date">
          <input
            type="number"
            name="value"
            id="value"
            value={value}
            placeholder="Enter value"
            onChange={onChange}
          />

          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={onChange}
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
