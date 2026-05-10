import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("voterId");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">🗳️E-Voting Portal</div>

      <div className="nav-links">
        <Link to="/">🏠Home</Link>
        <Link to="/instructions">📄Instructions</Link>
        <Link to="/register">📝Register</Link>
        <Link to="/login">🔐Login</Link>
        <Link to="/admin-login">📊Admin Dashboard</Link>
      </div>
    </header>
  );
}

export default Header;