import React, { useState } from "react";
import "./DonationForm.css";
import { useNavigate } from "react-router-dom";

export default function DonationForm() {
  const [form, setForm] = useState({
    category: "",
    quantity: "",
    description: "",
    expiry: "",
    condition: "",
    image: "",
    pickup: "",
    dropoff: "",
    name: "",
    email: "",
    phone: "",
    agree: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and submit donation logic here
    // Optionally call API to submit the form data
    // After successful submission, navigate to confirmation
    navigate("/confirmation");
  };

  const handleUpdate = async (donationId) => {
    try {
      const response = await fetch(`/api/donations/${donationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/donations");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async (donationId) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      try {
        await fetch(`/api/donations/${donationId}`, { method: "DELETE" });
        navigate("/donations");
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="donation-bg">
      <form className="donation-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="donation-header">
          <div className="donation-header-left">
            <img
              src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=facearea&w=200&q=80"
              alt="Donation"
              className="donation-image"
            />
          </div>
          <div className="donation-header-right">
            <h2>
              Make Your <br />
              <span className="donation-title">Donation</span>
            </h2>
            <img
              src="/logo.png"
              alt="Logo"
              className="donation-logo"
              style={{ width: 80, marginTop: 8 }}
            />
          </div>
        </div>
        <div className="donation-section-title">
          Tell us about the food you'd like to donate
        </div>
        <label>
          Food Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select food type</option>
            <option value="cooked">Cooked</option>
            <option value="dry">Dry Goods</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
          </select>
        </label>
        <label>
          Quantity
          <input
            type="text"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={2}
            required
          />
        </label>
        <label>
          Expiry Date
          <div className="input-icon">
            <span role="img" aria-label="calendar" className="icon">
              📅
            </span>
            <input
              type="date"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              required
            />
          </div>
        </label>
        <label>
          Condition
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select condition</option>
            <option value="fresh">Fresh</option>
            <option value="good">Good</option>
            <option value="expired">Expired</option>
          </select>
        </label>
        <label>
          Image
          <div className="input-icon">
            <span role="img" aria-label="image" className="icon">
              🖼️
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{ border: "none", padding: "0" }}
            />
            <button type="button" className="image-save-btn">
              Save
            </button>
          </div>
        </label>

        <div className="donation-section-title" style={{ marginTop: 15 }}>
          Location Details
        </div>
        <label>
          Pick-Up Location
          <div className="input-icon">
            <span role="img" aria-label="location" className="icon">
              📍
            </span>
            <input
              type="text"
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
              required
            />
          </div>
        </label>
        <label>
          Drop-Off Location
          <div className="input-icon">
            <span role="img" aria-label="location" className="icon">
              📍
            </span>
            <input
              type="text"
              name="dropoff"
              value={form.dropoff}
              onChange={handleChange}
              required
            />
          </div>
        </label>

        <div className="donation-section-title" style={{ marginTop: 15 }}>
          Doner Details
        </div>
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
          Phone Number
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>

        <div className="donation-checkbox-row">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            required
            style={{ accentColor: "#ff9100", marginRight: 5 }}
          />
          <span>I agree to the Terms & Conditions</span>
        </div>

        <div className="donation-btn-row">
          <button className="donation-btn confirm" type="submit">
            Confirm
          </button>
          <button className="donation-btn edit" type="button">
            Edit
          </button>
          <button className="donation-btn review" type="button">
            Review your donation
          </button>
        </div>
      </form>
    </div>
  );
}

