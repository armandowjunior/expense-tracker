import { useState } from "react";
import { MdLogin } from "react-icons/md";
// import { toast } from "react-toastify";

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

  return (
    <>
      <section className="heading">
        <h1>
          <MdLogin /> Login
        </h1>
        <p>Login into your account</p>
      </section>
      <section className="form">
        <form>
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
            Submit
          </button>
        </form>
      </section>
      <section className="new-account-text">
        <p>Don't have an account yet? Register here</p>
      </section>
    </>
  );
};

export default Login;
