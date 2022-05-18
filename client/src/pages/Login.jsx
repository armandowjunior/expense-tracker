import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";
import { MdLogin } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { reset, loginUser } from "../redux/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, pending, error, errorMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
    }

    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, error, errorMessage, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      email,
      password,
    };

    dispatch(loginUser(userInfo));
  };

  if (pending) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <MdLogin /> Login
        </h1>
        <p>Login into your account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-submit">
            Login
          </button>
        </form>
      </section>
      <section className="new-account-text">
        <p>
          Don't have an account yet? <Link to={"/register"}>Register here</Link>
        </p>
      </section>
    </>
  );
};

export default Login;
