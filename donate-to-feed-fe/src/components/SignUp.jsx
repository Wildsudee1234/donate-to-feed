import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp({ setUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      address: "",
      contact: "",
      password: "",
      role: "",
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
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
        setError(data.message || "Sign up failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="signup-bg">
      <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Sign Up</h2>
        {error && <div className="form-error">{error}</div>}
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact Num.
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            maxLength={15}
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
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <div className="signup-btn-row">
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
          <button
            className="reset-btn"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="form-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
