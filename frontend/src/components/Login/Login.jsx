import "../../../blocks/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
  setData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!data.email || !data.password) return;

  handleLogin(data);
};
  return (
    <section className="login">
      <h2 className="login__title">Login</h2>

      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="login__input"
          required
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="login__input"
          required
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="login__button">
          Login
        </button>
        <h3 className="login__register">
          Don't have an account?{" "}
          <Link to="/register" className="login__link">
            Register
          </Link>
        </h3>
      </form>
    </section>
  );
}
