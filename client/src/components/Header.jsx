import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../redux/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onClick = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <header>
      <p>Expense Tracker</p>

      <button className="btn" onClick={onClick}>
        Logout
      </button>
    </header>
  );
};

export default Header;
