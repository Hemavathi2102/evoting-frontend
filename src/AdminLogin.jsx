import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AdminLogin() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    if (!username.trim()) {
      setError("Please enter officer username");
      return;
    }

    if (!password.trim()) {
      setError("Please enter officer password");
      return;
    }

   if (username === "HERA" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🛂 Officer Login</h2>

        <input
          type="text"
          placeholder="Enter Officer Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Officer Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;