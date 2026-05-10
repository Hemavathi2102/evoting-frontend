import React from "react";
import { Link } from "react-router-dom";
import votingImg from "./voting.png";
import imageImg from "./image.png";
import electionImg from "./election.png";
import imgImg from "./img.png";
import SVImg from "./SV.png";
import LRImg from "./LR.png";
import AMImg from "./AM.png";
import FFImg from "./FF.png";
import noteImg from "./note.png";

function Home() {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <div className="hero-section">

        <div className="hero-text">
          <h1>🗳 Next Gen E-Voting System</h1>
          <p>
            A secure and transparent digital voting platform that enables
            voters to cast their votes safely while ensuring fairness and
            real-time election results.
          </p>
        </div>

        <div className="hero-image">
          <img src={votingImg} alt="Voting system" />
        </div>

      </div>

      {/* Features Title */}
      <h2 className="features-title">Platform Features</h2>

      {/* Features Section */}
      <div className="features-section">

        <div className="feature-card">
          <h3>🔐 Secure Login</h3>
          <p>OTP authentication protects voter identity.</p>
        </div>

        <div className="feature-card">
          <h3>⚡ Real Time Voting</h3>
          <p>Votes update instantly in the database.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Admin Dashboard</h3>
          <p>Admin monitors election results live.</p>
        </div>

        <div className="feature-card">
          <h3>🏆 Automatic Results</h3>
          <p>Winner calculated automatically.</p>
        </div>

      </div>

      {/* About Section */}
      <section className="info-section">
        <h2>📌 Introduction to E-Voting</h2>

        <img src={imageImg} alt="E-Voting" />

        <p>
          The Electronic Voting System is a modern digital solution designed
          to simplify elections. Instead of traditional paper ballots,
          voters can securely cast their votes online. The system reduces
          manual errors, speeds up vote counting, and ensures transparent
          election results.
        </p>
      </section>

      {/* Improvements Section */}
      <section className="info-section">
        <h2>⚙️ Enhancing the Election Process</h2>

        <img src={electionImg} alt="E-Voting" />

        <p>
          Our platform improves elections by making the voting process
          faster, easier, and more reliable for both voters and
          administrators.
        </p>

        <ul>
          <li>⚡ Faster vote casting and counting</li>
          <li>🌍 Remote voting accessibility</li>
          <li>📊 Instant result generation</li>
          <li>📄 Paperless and eco-friendly elections</li>
        </ul>
      </section>

      {/* Security Section */}
      <section className="info-section">
        <h2>🔒 System Security & Privacy</h2>

        <img src={imgImg} alt="E Voting" />

        <p>
          Security is the core of our E-Voting platform. Multiple protection
          mechanisms ensure that each vote remains private and authentic.
        </p>

        <ul>
          <li>🔐 OTP based voter authentication</li>
          <li>🛡 Encrypted data transmission</li>
          <li>👤 Unique voter verification</li>
          <li>🚫 Prevention of duplicate voting</li>
        </ul>
      </section>
      
      <h2 className="scroll-title">Why Choose Our Platform</h2>
      <div className="scroll-wrapper">
     <div className="scroll-track">

    <div className="scroll-item">
      <img src={SVImg} alt="Secure Voting" />
      <p>Secure Voting</p>
    </div>

    <div className="scroll-item">
      <img src={LRImg} alt="Fast Results" />
      <p>Fast Results</p>
    </div>

    <div className="scroll-item">
      <img src={AMImg} alt="Admin Control" />
      <p>Admin Monitoring</p>
    </div>

    <div className="scroll-item">
      <img src={FFImg} alt="Fair Election" />
      <p>Fair Elections</p>
    </div>

    <div className="scroll-item">
      <img src={noteImg} alt="voting view" />
      <p>Voting Method</p>
    </div>

    </div>
    </div>
    </div>
  );
}

export default Home;

