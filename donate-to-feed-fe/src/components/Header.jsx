import React from "react";
import { FaHeart, FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <FaHeart color="#ff9100" size={32} />
        <span className="brand-text">Donate To Feed</span>
      </div>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/feedback" className="nav-link">Feedback</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
        <Link to="/chat">
          <button className="chat-btn">
            <FaComments size={18} style={{ marginRight: 6, verticalAlign: "middle" }} />
            Chat
          </button>
        </Link>
        <Link to="/signin">
          <button className="signin">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="signup">Sign Up</button>
        </Link>
      </nav>
    </header>
  );
}
