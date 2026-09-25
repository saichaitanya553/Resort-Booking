import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/resorts" className="brand">Resort Booking</Link>
        <nav>
          <Link to="/resorts">Resorts</Link>
          <Link to="/bookings">My Bookings</Link>
          <span className="welcome">Hi, {user?.name?.split(" ")[0]}</span>
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </nav>
      </div>
    </header>
  );
}
