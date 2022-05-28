import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";
import { VscAccount } from "react-icons/vsc";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
      dispatch(reset());
    }

    if (user) {
      navigate("/");
    }
  }, [user, error, errorMessage, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userInfo = {
        name,
        email,
        password,
      };

      dispatch(registerUser(userInfo));
    }
  };

  if (pending) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <VscAccount /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Confirm Password</label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              placeholder="Confirm your password"
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-submit">
            Register
          </button>
        </form>
      </section>
      <section className="new-account-text">
        <p>
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </p>
      </section>
    </>
  );
};

export default Register;
