import React, { useState } from "react";
import "./FindFood.css";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/heroimage1.jpg";
import logo from "../assets/logo.jpg";
import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";

export default function FindFood() {
  const [location, setLocation] = useState("");
  const [foodCategory, setFoodCategory] = useState({
    cooked: false,
    raw: false,
    all: false,
  });
  const [availability, setAvailability] = useState("");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const foodList = [
    {
      img: food1,
      location: "Near Colombo City Center",
      category: "Raw Ingredients",
      availability: "Available",
      amount: "3 Kg",
    },
    {
      img: food2,
      location: "A2-20/D, Lotus Avenue, Colombo",
      category: "Raw Ingredients",
      availability: "Available",
      amount: "5 Kg",
    },
  ];

  return (
    <div className="findfood-bg">
      <div className="findfood-card">
        {/* Hero section */}
        <div className="findfood-hero">
          <div className="findfood-heroimg-wrap">
            <img src={heroImg} className="findfood-heroimg" alt="Food Share" />
            <img src={logo} className="findfood-logo" alt="Logo" />
          </div>
          <div className="findfood-title">
            <span>Find Available Food</span>
            <br />
            <span className="findfood-near">Near You</span>
          </div>
        </div>
        {/* Search */}
        <label className="findfood-label">Search</label>
        <div className="findfood-searchbox">
          <input type="text" placeholder="Search here" />
        </div>
        {/* Filters */}
        <div className="findfood-filtertitle">Filters:</div>
        <div className="findfood-filters">
          <div>
            <label>Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)}>
              <option value="">Select the location</option>
              <option value="colombo">Colombo</option>
              <option value="kandy">Kandy</option>
            </select>
          </div>
          <div>
            <label>Food Category</label>
            <div className="findfood-checkboxrow">
              <label>
                <input type="checkbox" checked={foodCategory.cooked} onChange={e => setFoodCategory({ ...foodCategory, cooked: e.target.checked })}/>
                Cooked Meals
              </label>
              <label>
                <input type="checkbox" checked={foodCategory.raw} onChange={e => setFoodCategory({ ...foodCategory, raw: e.target.checked })}/>
                Raw Ingredients
              </label>
              <label>
                <input type="checkbox" checked={foodCategory.all} onChange={e => setFoodCategory({ ...foodCategory, all: e.target.checked })}/>
                <span className="findfood-allcolor" />
                All
              </label>
            </div>
          </div>
          <div>
            <label>Availability</label>
            <select value={availability} onChange={e => setAvailability(e.target.value)}>
              <option value="">Availability</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div className="findfood-quantity">
            <label>Quantity</label>
            <div className="findfood-sliderlabels">
              <span>Small</span>
              <input type="range" min={1} max={5} value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
              <span>Large</span>
            </div>
          </div>
        </div>
        {/* Filter buttons */}
        <div className="findfood-filterbtns">
          <button className="findfood-applybtn">Apply Filters</button>
          <button className="findfood-clearbtn">Clear Filters</button>
        </div>
        {/* Food Cards */}
        <div className="findfood-foodlist">
          {foodList.map((food, i) => (
            <div className="findfood-foodcard" key={i}>
              <img src={food.img} alt="food" className="findfood-foodthumb" />
              <div className="findfood-foodinfo">
                <div><b>{food.location}</b></div>
                <div>{food.category}</div>
                <div>{food.availability}</div>
                <div>Small amount: {food.amount}</div>
              </div>
              <button
                className="findfood-requestbtn"
                onClick={() => navigate("/request-confirmation")}
              >
                Request
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
