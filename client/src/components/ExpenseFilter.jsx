import { useState } from "react";

const ExpenseFilter = () => {
  const [formData, setFormData] = useState({
    year: "",
    months: [],
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClick = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      months: e.target.checked
        ? [...prevState.months, e.target.value]
        : prevState.months.filter((item) => item !== e.target.value),
    }));
  };

  return (
    <section className="filter">
      <h3>Incomes and Expenses:</h3>
      <form className="filter-form">
        <div className="filter-year-label">
          <label htmlFor="year-filter">Filter by year and month:</label>
          <select name="year" id="year-filter" onChange={onChange}>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>

        <div className="months-container">
          <input
            type="checkbox"
            id="jan"
            name="jan"
            value="jan"
            onClick={onClick}
          />
          <label htmlFor="jan">Jan</label>
          <input
            type="checkbox"
            id="feb"
            name="feb"
            value="feb"
            onClick={onClick}
          />
          <label htmlFor="feb">Feb</label>
          <input
            type="checkbox"
            id="mar"
            name="mar"
            value="mar"
            onClick={onClick}
          />
          <label htmlFor="mar">Mar</label>
          <input
            type="checkbox"
            id="apr"
            name="apr"
            value="apr"
            onClick={onClick}
          />
          <label htmlFor="apr">Apr</label>
          <input
            type="checkbox"
            id="may"
            name="may"
            value="may"
            onClick={onClick}
          />
          <label htmlFor="may">May</label>
          <input
            type="checkbox"
            id="jun"
            name="jun"
            value="jun"
            onClick={onClick}
          />
          <label htmlFor="jun">Jun</label>
        </div>
        <div className="months-container-2">
          <input
            type="checkbox"
            id="jul"
            name="jul"
            value="jul"
            onClick={onClick}
          />
          <label htmlFor="jul">Jul</label>
          <input
            type="checkbox"
            id="aug"
            name="aug"
            value="aug"
            onClick={onClick}
          />
          <label htmlFor="aug">Aug</label>
          <input
            type="checkbox"
            id="sep"
            name="sep"
            value="sep"
            onClick={onClick}
          />
          <label htmlFor="sep">Sep</label>
          <input
            type="checkbox"
            id="oct"
            name="oct"
            value="oct"
            onClick={onClick}
          />
          <label htmlFor="oct">Oct</label>
          <input
            type="checkbox"
            id="nov"
            name="nov"
            value="nov"
            onClick={onClick}
          />
          <label htmlFor="nov">Nov</label>
          <input
            type="checkbox"
            id="dec"
            name="dec"
            value="dec"
            onClick={onClick}
          />
          <label htmlFor="dec">Dec</label>
        </div>

        <button type="submit" className="btn btn-filter">
          Filter
        </button>
      </form>
    </section>
  );
};

export default ExpenseFilter;
