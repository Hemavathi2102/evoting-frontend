import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./App.css"; // ✅ KEEP THIS

const BASE_URL = "https://evoting-backend-62hq.onrender.com";

function Login() {
  const [name, setName] = useState("");
  const [voterId, setVoterId] = useState("");
  const [otp, setotp] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [waitingVerification, setWaitingVerification] = useState(false);

  const navigate = useNavigate();
  const socketRef = useRef(null);

  // -------------------- SOCKET SETUP --------------------
  useEffect(() => {
  if (socketRef.current) return;

  socketRef.current = io(BASE_URL);

  socketRef.current.on("mobileStartedVerification", () => {
    setWaitingVerification(true);
  });

  socketRef.current.on("sessionVerified", (id) => {
    const storedId = localStorage.getItem("voterId");
    if (id === storedId) {
      setWaitingVerification(false);
      alert("Verification Successful!");
      navigate("/poll");
    }
  });

  return () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
  };
}, [navigate]);

  // -------------------- SCROLL TO QR --------------------
  useEffect(() => {
    if (qrCode) {
      const qrElement = document.querySelector(".qr-section");
      if (qrElement) qrElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [qrCode]);

  // -------------------- QR TIMEOUT --------------------
  useEffect(() => {
  let timer;

  if (qrCode) {
    timer = setTimeout(() => {
      alert("QR verification timed out ⏰");
      setQrCode("");
      setWaitingVerification(false);
    }, 120000);
  }

  return () => clearTimeout(timer);
}, [qrCode]);

  // -------------------- SUBMIT HANDLER --------------------
  const handleSubmit = async () => {
    if (!name || !voterId || !otp) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const cleanId = voterId.trim().toUpperCase();

      const response = await axios.post(`${BASE_URL}/vote`, {
        name,
        voterId: cleanId,
        password: otp,
      });

      if (!response.data.qrCode) {
        alert("QR Generation Failed");
        return;
      }

      localStorage.setItem("voterId", cleanId);
      socketRef.current.emit("joinRoom", cleanId);

      setQrCode(response.data.qrCode);
    } catch (error) {
      alert(error.response?.data?.message || "QR Generation Failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- UI --------------------
  return (
    <div className="container">
      <div className="card">
        <h1>Next-Gen E-Voting System</h1>

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading || waitingVerification || qrCode }
        />

        <input
          type="text"
          placeholder="Enter Voter ID"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value.toUpperCase())}
          disabled={loading || waitingVerification || qrCode}
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setotp(e.target.value)}
          disabled={loading || waitingVerification || qrCode}
        />

        <button onClick={handleSubmit} disabled={loading || waitingVerification}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {qrCode && (
          <div className="qr-section" style={{ position: "relative" }}>
            <h2>Scan QR with Mobile</h2>
            <img src={qrCode} alt="QR Code" />

            {waitingVerification && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.7)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="spinner"></div>
                <p style={{ color: "green", marginTop: "10px" }}>
                  Waiting for mobile verification...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;