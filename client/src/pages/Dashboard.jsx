import ExpenseFilter from "../components/ExpenseFilter";
import ExpenseForm from "../components/ExpenseForm";
import { FaTrashAlt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <>
      <h1 className="heading"> Good afternoon, Fulano!</h1>
      <section className="balance">
        <p>Your balance:</p>
        <h2> 3,000.00 </h2>
        <div className="income-expense">
          <p className="income"> + 4,000.00</p>
          <p className="expense"> - 1,000.00</p>
        </div>
      </section>

      <ExpenseForm />

      <ExpenseFilter />

      <section className="expenses-list">
        <div className="expense-desc-value">
          <p>Lorem ipsum dolor sit amet.</p>
          <p className="value-positive">$ +2,000</p>
        </div>
        <p>28 - May - 2022</p>
        <FaTrashAlt className="delete-btn" />
      </section>
    </>
  );
};

export default Dashboard;
