import "../../../blocks/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register({ handleRegistration }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    console.log("SUBMIT funcionando", data);
    if (!data.email || !data.password || !data.confirmPassword) return;

    if (data.password !== data.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    handleRegistration({ email: data.email, password: data.password });
  };
  // ;

  //     auth
  //       .register(email, password)
  //       .then(() => {
  //         console.log("Registro OK");
  //         navigate("/login");
  //       })
  //       .catch((err) => {
  //         console.log("Error:", err);
  //       });
  //   };
  // };

  return (
    <section className="login">
      <h2 className="login__title">Register</h2>

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
        <input
          type="password"
          placeholder="Confirm your password"
          required
          className="login__input"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit" className="login__button">
          Register
        </button>
        <h3 className="login__register">
          Already have an account?{" "}
          <Link to="/login" className="login__link">
            Login
          </Link>
        </h3>
      </form>
    </section>
  );
}
