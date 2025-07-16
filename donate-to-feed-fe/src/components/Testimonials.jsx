import React from "react";

export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What People Say</h2>
      <div className="testimonial-list">
        <div className="testimonial-card">
          <div className="testimonial-header">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="S. De Silva" />
            <div>
              <b>S. De Silva</b>
              <div className="stars">★★★★★</div>
              <span>Social Worker</span>
            </div>
          </div>
          <p>
            Thanks to this platform, we reach more hungry families than ever. Simple, fast, and truly impactful!
          </p>
        </div>
        <div className="testimonial-card">
          <div className="testimonial-header">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="C. Fernando" />
            <div>
              <b>C. Fernando</b>
              <div className="stars">★★★★★</div>
              <span>NGO Administrator</span>
            </div>
          </div>
          <p>
            Donating excess food is now easier than ever. This system has changed how we help our community!
          </p>
        </div>
      </div>
    </section>
  );
}
