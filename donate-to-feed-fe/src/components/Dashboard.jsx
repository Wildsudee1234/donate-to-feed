import React from "react";
import "./Dashboard.css";

// Remove direct image imports and use placeholder URLs
const defaultLogoUrl = "https://via.placeholder.com/60";
const defaultUserUrl = "https://via.placeholder.com/36";

export default function Dashboard() {
  return (
    <div className="dash-bg">
      <div className="dash-card">
        {/* Sidebar */}
        <aside className="dash-sidebar">
          <div className="dash-logo-box">
            <img src={defaultLogoUrl} alt="Logo" className="dash-logo" />
          </div>
          <nav>
            <ul>
              <li>
                <span className="dash-icon">🔔</span> Notification
              </li>
              <li>
                <span className="dash-icon">📁</span> Files
              </li>
              <li>
                <span className="dash-icon">🕒</span> History
              </li>
            </ul>
          </nav>
          <div className="dash-sidebar-bottom">
            <button className="dash-sidebar-btn">⚙️ Settings</button>
            <button className="dash-sidebar-btn">ℹ️ Help</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dash-main">
          {/* Top bar */}
          <div className="dash-topbar">
            <div className="dash-tabs">
              <button className="active">Dashboard</button>
              <button>User Management</button>
              <button>Listing Management</button>
              <button>Feedback</button>
            </div>
            <div className="dash-userbar">
              <div className="dash-searchbar">
                <input type="text" placeholder="Search" />
              </div>
              <div className="dash-userprofile">
                <img src={defaultUserUrl} alt="User" />
                <span>Mr. Pereira</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="dash-header">
            <div>
              <h2>
                Hello! <span className="dash-header-name">Mr. Pereira</span>
              </h2>
              <div className="dash-progress">
                <span className="completed">Completed<br /><b>70%</b></span>
                <span className="ongoing">On Going<br /><b>20%</b></span>
                <span className="scheduled">Scheduled<br /><b>10%</b></span>
              </div>
            </div>
            <div className="dash-date">
              <div className="dash-date-box">
                <span className="dash-date-day">25</span>
                <span className="dash-date-month">June</span>
              </div>
              <span className="dash-date-year">2025</span>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="dash-section-title">Statistics</div>
          <div className="dash-stats-grid">
            {/* User Count Chart */}
            <div className="dash-widget dash-linechart">
              <div className="dash-widget-title">User Count</div>
              <div className="fake-chart">
                {/* Simple SVG placeholder for chart */}
                <svg width="100%" height="60" viewBox="0 0 200 60">
                  <polyline
                    fill="none"
                    stroke="#ff9901"
                    strokeWidth="3"
                    points="0,50 30,40 50,43 90,37 120,29 150,36 180,10 200,15"
                  />
                  <circle cx="30" cy="40" r="2.8" fill="#ff9901"/>
                  <text x="17" y="36" fontSize="10" fill="#555">100</text>
                  <circle cx="180" cy="10" r="2.8" fill="#ff9901"/>
                  <text x="170" y="20" fontSize="10" fill="#555">400</text>
                </svg>
              </div>
            </div>
            {/* Donut Chart */}
            <div className="dash-widget dash-donutchart">
              <div className="dash-widget-title">Total Donations & Feeds</div>
              <div className="fake-donuts">
                <div className="donut">
                  <svg width="54" height="54">
                    <circle cx="27" cy="27" r="21" fill="none" stroke="#ff9901" strokeWidth="11" />
                    <circle cx="27" cy="27" r="21" fill="none" stroke="#eee" strokeWidth="11" strokeDasharray="132 132" strokeDashoffset="40" />
                  </svg>
                  <span className="donut-label">100</span>
                </div>
                <div className="donut">
                  <svg width="54" height="54">
                    <circle cx="27" cy="27" r="21" fill="none" stroke="#22936c" strokeWidth="11" />
                    <circle cx="27" cy="27" r="21" fill="none" stroke="#eee" strokeWidth="11" strokeDasharray="132 132" strokeDashoffset="65" />
                  </svg>
                  <span className="donut-label">80</span>
                </div>
              </div>
            </div>
            {/* Map Chart */}
            <div className="dash-widget dash-map">
              <div className="dash-widget-title">Distribution In Sri Lanka <span className="map-arrow">↗</span></div>
              <div className="fake-map">
                {/* Use a static SL map image or svg for demo */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Sri_Lanka_Map.svg" alt="Sri Lanka" style={{ width: "76%", marginLeft: "12%" }}/>
                <ul className="map-legend">
                  <li><span className="dot dot-orange"></span>Donated Areas</li>
                  <li><span className="dot dot-green"></span>Fed Areas</li>
                  <li><span className="dot dot-both"></span>Both</li>
                </ul>
              </div>
            </div>
            {/* Bar Chart */}
            <div className="dash-widget dash-barchart">
              <div className="dash-widget-title">Data Analysis from 2021-2024</div>
              <div className="fake-bar">
                <svg width="98%" height="72" viewBox="0 0 150 72">
                  <g>
                    <rect x="13" y="50" width="16" height="22" fill="#ff9901"/>
                    <rect x="33" y="30" width="16" height="42" fill="#22936c"/>
                    <rect x="53" y="36" width="16" height="36" fill="#ff9901"/>
                    <rect x="73" y="20" width="16" height="52" fill="#22936c"/>
                    <rect x="93" y="24" width="16" height="48" fill="#ff9901"/>
                    <rect x="113" y="13" width="16" height="59" fill="#22936c"/>
                  </g>
                </svg>
                <div className="bar-legend">
                  <span className="dot dot-orange"></span>Donations
                  <span className="dot dot-green" style={{marginLeft:12}}></span>Feeds
                </div>
              </div>
            </div>
          </div>
          {/* Updates Section */}
          <div className="dash-updates-card">
            <b>Updates</b>
            <p>
              Successfully completed the donations and feeds so far 70%<br />
              Ongoing processes, not delivered yet to the location: 20%<br />
              Scheduled processes: 10%
            </p>
          </div>
          <button className="dash-float-btn">C</button>
        </main>
      </div>
    </div>
  );
}
