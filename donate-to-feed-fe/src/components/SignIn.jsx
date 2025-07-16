import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn({ setUser }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setUser(data.data.user);
        localStorage.setItem("token", data.token);
        // Navigate according to role
        if (data.data.user.role?.toLowerCase() === "admin") navigate("/dashboard");
        else navigate("/");
      } else {
        setError(data.message || "Sign in failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="signin-bg">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <div className="form-error">{error}</div>}
        <label>
          Username
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>
        <div className="userrole-row">
          <span>User Role</span>
          <label className="radio">
            <input
              type="radio"
              name="role"
              value="Doner"
              checked={form.role === "Doner"}
              onChange={handleChange}
              required
            />
            <span className="custom-radio"></span>
            Doner
          </label>
          <label className="radio">
            <input
              type="radio"
              name="role"
              value="Receiver"
              checked={form.role === "Receiver"}
              onChange={handleChange}
            />
            <span className="custom-radio"></span>
            Receiver
          </label>
          <label className="radio">
            <input
              type="radio"
              name="role"
              value="Admin"
              checked={form.role === "Admin"}
              onChange={handleChange}
            />
            <span className="custom-radio"></span>
            Admin
          </label>
        </div>
        <button className="signin-btn" type="submit">
          Sign In
        </button>
        <div className="form-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
