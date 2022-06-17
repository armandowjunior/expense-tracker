const ExpenseFilter = () => {
  return (
    <form className="filter-container">
      <fieldset className="filter">
        <legend>Filter by</legend>
        <label htmlFor="year-filter">Year:</label>
        <select name="year" id="year-filter">
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>

        <label htmlFor="month-filter">Month:</label>
        <select name="month" id="month-filter">
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </fieldset>
      <button type="submit" className="btn btn-filter">
        Filter
      </button>
    </form>
  );
};

export default ExpenseFilter;
