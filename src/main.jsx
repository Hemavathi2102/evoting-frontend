import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Instructions from "./Instructions";
import Poll from "./Poll";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";

// 404 Page
const NotFound = () => (
  <div
    style={{
      textAlign: "center",
      marginTop: "50px",
      fontSize: "2rem",
      color: "red",
    }}
  >
    404 - Page Not Found
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* USER PAGES (with Header & Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/poll" element={<Poll />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);