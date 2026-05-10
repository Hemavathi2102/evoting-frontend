import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const BASE_URL = "https://evoting-backend-62hq.onrender.com";

function Poll() {
  const [selectedParty, setSelectedParty] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

const handleVote = async () => {
  if (!selectedParty) {
    setMessage("Please select a party");
    return;
  }

  const voterId = localStorage.getItem("voterId")?.trim();

  if (!voterId) {
  setMessage("Session expired. Please login again.");
  return;
}
  
  try {
    const response = await axios.post(`${BASE_URL}/final-vote`, {
      voterId: voterId.trim(),
      password: password.trim(),   // 🔥 This must match backend
      party: selectedParty,
    });

    setMessage(response.data.message);
    localStorage.removeItem("voterId");
    setTimeout(() => {
      navigate("/");
    }, 2000);

  } catch (error) {
    console.log("Vote Error:", error);
    setMessage(error.response?.data?.message || "Error submitting vote");
  }
};

  return (
  <div className="poll-container">
    <div className="poll-card">
      <h2 className="poll-title">Cast Your Vote</h2>

      <div className="party-options">
        {["Party A", "Party B", "Party C"].map((party) => (
          <label
            key={party}
            className={`party-card ${
              selectedParty === party ? "active" : ""
            }`}
          >
            <input
              type="radio"
              value={party}
              checked={selectedParty === party}
              onChange={(e) => setSelectedParty(e.target.value)}
            />
            {party}
          </label>
        ))}
      </div>

      <input
        type="password"
        placeholder="Enter OTP"
        className="otp-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="submit-btn" onClick={handleVote}>
        Submit Vote
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  </div>
);
}

export default Poll;