import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./index.css";
import { motion } from "framer-motion";
import { auth, firestore, GoogleAuthProvider } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc, getDocs, query, where, collection } from "firebase/firestore";

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const [name, setName] = useState(""); // Added name field
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password

  const navigate = useNavigate(); // Initialize useNavigate

  // Check if username exists
  const checkUsernameExists = async (username) => {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Returns true if username exists
  };

  // Suggest a new username
  const suggestNewUsername = async (username) => {
    let newUsername = username;
    let count = 1;

    while (await checkUsernameExists(newUsername)) {
      newUsername = `${username}${count}`;
      count++;
    }

    return newUsername;
  };

  // Validate password
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return regex.test(password);
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in!");
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Check if username exists
    if (await checkUsernameExists(username)) {
      const suggestedUsername = await suggestNewUsername(username);
      setUsernameError(`Username taken. Try ${suggestedUsername}`);
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain a special character, a number, and an uppercase letter."
      );
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    try {
      // Check if email is already in use
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError("Email already in use. Please log in instead.");
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        name, // Save name
        email,
        username,
      });

      console.log("User registered!");
      navigate("/dashboard"); // Redirect to dashboard after successful registration
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Please log in instead.");
      } else {
        setError(err.message);
      }
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("User logged in with Google!");
      navigate("/dashboard"); // Redirect to dashboard after successful Google login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="landing-container">
      {/* Navbar at the top of the page */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>Help</li>
          <li>Contact Us</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Side: StudyBuddy Title and Description */}
        <div className="left-side">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="title"
          >
            StudyBuddy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="description"
          >
            Find the perfect study partner for your learning journey.
          </motion.p>
        </div>

        {/* Right Side: Login/Register Form */}
        <div className="right-side">
          <motion.div
            className="auth-box"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isLogin ? (
              // Login Form
              <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={handleGoogleLogin} className="google-login">
                  Login with Google
                </button>
                <p className="toggle-form">
                  Don't have an account? <span onClick={() => setIsLogin(false)}>Register</span>
                </p>
              </form>
            ) : (
              // Registration Form
              <form onSubmit={handleRegister}>
                <h2>Register</h2>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {usernameError && <p className="error">{usernameError}</p>}
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                {passwordError && <p className="error">{passwordError}</p>}
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                <button type="submit">Register</button>
                <p className="toggle-form">
                  Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
                </p>
              </form>
            )}

            {error && <p className="error">{error}</p>}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;