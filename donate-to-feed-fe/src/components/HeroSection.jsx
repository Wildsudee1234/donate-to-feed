import React from "react";
import { useNavigate } from "react-router-dom";
import mainImg from "../assets/heroimage.jpg";
import person1 from "../assets/person1.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero custom-hero">
      <div className="hero-left">
        <h1>
          We make sharing <br /> simple and impact <br /> immense.
        </h1>
        <p>
          Donate To Feed. We aim to be the leading solution for food donation,
          fostering a more sustainable, eco-friendly and equitable food donation system.
        </p>
        <div className="hero-btns">
          <button
            className="btn-orange"
            onClick={() => navigate("/donate")}
          >
            Donate
          </button>
          <button
            className="btn-green"
            onClick={() => navigate("/feed")}
          >
            Feed
          </button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="main-img-container">
          {/* Main hero image */}
          <img src={mainImg} alt="donate" className="main-img" />
          {/* Overlapping small avatars */}
          <img src={person1} alt="avatar1" className="avatar avatar-top-right" />
          <img src={person2} alt="avatar2" className="avatar avatar-bottom-right" />
          <img src={person3} alt="avatar3" className="avatar avatar-left-dot" />
          {/* Color accent circles */}
          <div className="circle-accent accent1"></div>
          <div className="circle-accent accent2"></div>
        </div>
      </div>
    </section>
  );
}


