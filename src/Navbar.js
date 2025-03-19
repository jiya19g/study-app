import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./index.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      setDropdownOpen(false); // Close dropdown after logout
      window.history.replaceState(null, null, "/"); // Prevent back navigation
      navigate("/", { replace: true }); // Redirect to landing page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="dashboard-navbar">
      <div className="navbar-left">
        <h1>StudyBuddy</h1>
      </div>
      <div className="navbar-right">
        <div className="profile-dropdown">
          <div className="profile-icon" onClick={toggleDropdown}>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-image"
            />
          </div>
          {dropdownOpen && (
            <div className="dropdown-content">
              <p>Settings</p>
              <p onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
