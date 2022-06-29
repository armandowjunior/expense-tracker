import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExpensesFiltered } from "../features/expenses/expenseSlice";

const ExpenseFilter = () => {
  const dispatch = useDispatch();

  const { yearsToFilter } = useSelector((state) => state.expenses);

  const [formData, setFormData] = useState({
    year: "",
    month: "0",
    monthName: "January",
  });

  // useEffect para mudar o default year para o primeiro valor do yearsToFilter
  // caso o user faça um query sem mudar o valor do select field
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      year: yearsToFilter[0],
    }));
  }, [yearsToFilter]);

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

  return (
    <form className="filter-container" onSubmit={onSubmit}>
      <fieldset className="filter">
        <legend>Filter by</legend>
        <label htmlFor="year-filter">Year:</label>
        <select name="year" id="year-filter" onChange={onChange}>
          {yearsToFilter.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
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
  );
};

export default ExpenseFilter;
