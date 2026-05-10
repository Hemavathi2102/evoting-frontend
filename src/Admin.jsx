import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Bar } from "react-chartjs-2";
import "./App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Admin() {
  const [votes, setVotes] = useState([]);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();
  const chartData = {
  labels: votes.map((v) => v._id),
  datasets: [
    {
      label: "Votes",
      data: votes.map((v) => v.count),
      backgroundColor: [
          "#6366f1", // indigo
          "#10b981", // emerald
          "#ef4444", // red
          "#f59e0b", // amber
          "#06b6d4"  // cyan
      ],
      borderRadius: 10
    }
  ]
};

  // ADD OPTIONS HERE 👇
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Live Voting Results"
      }
    }
  };

  // 🔐 ADMIN AUTH CHECK
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // 🔴 SOCKET CONNECTION (ADMIN)
  useEffect(() => {
    const socket = io("https://evoting-backend-62hq.onrender.com");

    // Tell backend this client is admin
    socket.emit("adminJoin");

    socket.on("connect", () => {
      console.log("🟢 Admin connected:", socket.id);
    });

    socket.on("voteUpdate", (data) => {
      console.log("📊 Vote Update:", data);
      setVotes(data);
    });

    return () => socket.disconnect();
  }, []);

  // 🏁 END ELECTION
const endElection = async () => {
  try {
    const res = await fetch("https://evoting-backend-62hq.onrender.com/end-election", {
      method: "POST"
    });

    const data = await res.json();
    setWinner(data);

  } catch (error) {
    console.error("Error ending election:", error);
  }
};

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  return (
    <div className="container">
      <div className="card" style={{ width: "100%", maxWidth: "600px" }}>
        <h1>📊 Admin Dashboard</h1>
        <button onClick={endElection}
                disabled={winner}
                style={{ padding: "10px 20px", background: winner ? "#94a3b8" : "#6366f1", color: "white", border: "none", borderRadius: "6px", cursor: winner ? "not-allowed" : "pointer", marginBottom: "20px" }}>
               End Election
        </button>

      {winner && (
        <div style={{ background: "#16a34a", padding: "15px",borderRadius: "10px",marginBottom: "20px", color: "white"}}>
          🏆 Winner: {winner.winner} <br />
           Total Votes: {winner.votes}
        </div>
        )}

        {votes.length > 0 && (
         <div style={{ marginBottom: "30px", height: "250px", width: "100%" }}>
         <Bar data={chartData} options={options} />
         </div>
         )}

        <button
          onClick={handleLogout}
          style={{ marginBottom: "20px", padding: "10px 20px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                Logout
        </button>
      </div>
    </div>
  );
}

export default Admin;