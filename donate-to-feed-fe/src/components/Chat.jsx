import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import assistantImg from "../assets/assistant.png"; 
import "./Chat.css"; 


export default function Chat() {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <span className="chat-title"><b>Chat</b></span>
        <span className="chat-help">We’re here to help you</span>
      </div>
      <div className="chat-body">
        <div className="chat-message-row">
          <img src={assistantImg} alt="assistant" className="chat-avatar" />
          <div className="chat-bubble">
            Hello! Mr. Pereira <br />
            You’re in DonateToFeed.lk Platform,<br />
            we are here to help you
          </div>
        </div>
        <div className="chat-watermark">DonateToFeed.lk</div>
      </div>
      <form className="chat-footer">
        <input className="chat-input" placeholder="Type your message here" />
        <button type="submit" className="chat-send-btn">
          <FaPaperPlane size={22} />
        </button>
      </form>
    </div>
  );
}
