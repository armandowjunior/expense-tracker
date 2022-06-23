import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getExpenses,
  getExpensesFiltered,
} from "../features/expenses/expenseSlice";

const ExpenseFilter = () => {
  const dispatch = useDispatch();

  const { filter, filterData } = useSelector((state) => state.expenses);

  const { monthName, year } = filterData;

  const [formData, setFormData] = useState({
    year: "2022",
    month: "0",
    monthName: "January",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onMonthChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      month: e.target.value,
      monthName: e.target[e.target.value].text,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(getExpensesFiltered(formData));
  };

  const removeFilters = () => {
    dispatch(getExpenses());
  };

  return (
    <>
      {filter ? (
        <>
          <p className="filter-values">
            {monthName} {year}
          </p>
          <button className="btn" onClick={removeFilters}>
            Remove filters
          </button>
        </>
      ) : (
        <form className="filter-container" onSubmit={onSubmit}>
          <fieldset className="filter">
            <legend>Filter by</legend>
            <label htmlFor="year-filter">Year:</label>
            <select name="year" id="year-filter" onChange={onChange}>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>

            <label htmlFor="month-filter">Month:</label>
            <select name="month" id="month-filter" onChange={onMonthChange}>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </fieldset>
          <button type="submit" className="btn btn-filter">
            Filter
          </button>
        </form>
      )}
    </>
  );
};

export default ExpenseFilter;
