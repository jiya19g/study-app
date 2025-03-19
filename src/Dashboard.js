import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./Navbar"; // Import the Navbar component
import { auth, firestore } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { FaUsers, FaPlus, FaChartLine, FaTasks, FaBriefcase, FaBook } from "react-icons/fa"; // Import icons

const Dashboard = () => {
  const [userName, setUserName] = useState(""); // State to store the user's name

  // Fetch the user's name from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch the user's name from Firestore
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name); // Set the user's name
        }
      } else {
        // If no user is logged in, redirect to the login page
        // You can use `navigate` from `react-router-dom` here if needed
        console.log("No user is logged in.");
      }
    });

    // Cleanup the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Welcome Message */}
        <div className="welcome-message">
          <h2>Welcome, {userName}</h2>
          <p>Let's make today productive!</p>
        </div>

        {/* Study Room Section */}
        <section className="dashboard-section">
          <h2>Study Room</h2>
          <div className="card-container">
            <div className="card study-room-card">
              <div className="card-icon">
                <FaUsers size={32} />
              </div>
              <h3>Join Room</h3>
              <p>Join an existing study room to collaborate with others.</p>
            </div>
            <div className="card study-room-card">
              <div className="card-icon">
                <FaPlus size={32} />
              </div>
              <h3>Create Room</h3>
              <p>Create a new study room and invite others to join.</p>
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section className="dashboard-section">
          <h2>Progress</h2>
          <div className="card-container">
            <div className="card progress-card">
              <div className="card-icon">
                <FaChartLine size={32} />
              </div>
              <h3>Tracker</h3>
              <p>Track your study progress and achievements.</p>
            </div>
            <div className="card progress-card">
              <div className="card-icon">
                <FaTasks size={32} />
              </div>
              <h3>To-Do</h3>
              <p>Manage your tasks and stay organized.</p>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="dashboard-section">
          <h2>Resources</h2>
          <div className="card-container">
            <div className="card resources-card">
              <div className="card-icon">
                <FaBriefcase size={32} />
              </div>
              <h3>Career Corner</h3>
              <p>Explore career resources and opportunities.</p>
            </div>
            <div className="card resources-card">
              <div className="card-icon">
                <FaBook size={32} />
              </div>
              <h3>Resource Hub</h3>
              <p>Access a library of study materials and tools.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;