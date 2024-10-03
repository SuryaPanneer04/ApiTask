import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./signupValidation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // Change from array to object

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, // Fix here, use value directly, not as an array
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Run validation directly
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Check errors from the validation function directly
    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="register">
        <h1>Signup Page</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          onChange={handleInput}
          name="name"
          autoComplete="name" // Add autocomplete
        />
        {errors.name && <span>{errors.name}</span>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={handleInput}
          name="email"
          autoComplete="email" // Add autocomplete
        />
        {errors.email && <span>{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={handleInput}
          name="password"
          autoComplete="current-password" // Add autocomplete as per warning
        />
        {errors.password && <span>{errors.password}</span>}

        <button type="submit">Signup</button>
        <Link to="/" id="link">
          Sign-in
        </Link>
      </div>
    </form>
  );
}

export default Signup;
