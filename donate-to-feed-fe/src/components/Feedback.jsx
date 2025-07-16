import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import logo from "../assets/logo.jpg"; 
import "./Feedback.css"; 

const starsArr = [1, 2, 3, 4, 5];

export default function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 2,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const setRating = (star) => setForm({ ...form, rating: star });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic here
    alert("Feedback submitted!");
  };

  return (
    <div className="feedback-bg">
      <form className="feedback-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="feedback-side">
          <img src={logo} alt="Logo" className="feedback-logo" />
          <div className="feedback-label-vertical">FEEDBACK</div>
        </div>
        <div className="feedback-main">
          <div className="feedback-row">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="feedback-row">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="feedback-row">
            <label>Comment</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Comment here"
              required
              rows={4}
            />
          </div>
          <div className="feedback-row">
            <label>Rate</label>
            <div className="feedback-stars">
              {starsArr.map((star) => (
                <span
                  key={star}
                  className={`star ${form.rating >= star ? "filled" : ""}`}
                  onClick={() => setRating(star)}
                  role="button"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="feedback-row">
            <label>Image</label>
            <div className="feedback-upload">
              <FiUpload size={22} style={{ marginRight: 7, color: "#777" }} />
              <input
                type="file"
                name="image"
                accept="image/*"
                id="feedback-file"
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <label htmlFor="feedback-file" className="feedback-upload-label">
                {form.image ? form.image.name : "Upload image here"}
              </label>
            </div>
          </div>
          <div className="feedback-submit-row">
            <button className="feedback-submit" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
