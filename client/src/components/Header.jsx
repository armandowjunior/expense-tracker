import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <p>
        <Link className="header-link" to={"/"}>
          Expense Tracker
        </Link>
      </p>

      {user && (
        <button className="btn" onClick={onClick}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
