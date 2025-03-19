import React from "react";
import "./index.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="help-container">
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <motion.div
        className="help-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* FAQs Section */}
        <motion.div
          className="faqs"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2>FAQs</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>How do I create an account?</h3>
              <p>
                Click on the "Register" button on the homepage, fill in your details, and follow the
                instructions to create your account.
              </p>
            </div>
            <div className="faq-item">
              <h3>How do I find a study partner?</h3>
              <p>
                Use the search feature to find users with similar interests or join study groups in
                your field of study.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I use StudyBuddy for free?</h3>
              <p>
                Yes, StudyBuddy is completely free to use. You can access all features without any
                charges.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="features"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2>Features</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Study Partner Matching</h3>
              <p>
                Connect with like-minded learners based on your interests and study goals.
              </p>
            </div>
            <div className="feature-item">
              <h3>Collaboration Tools</h3>
              <p>
                Schedule study sessions, share resources, and track your progress with our tools.
              </p>
            </div>
            <div className="feature-item">
              <h3>Personalized Study Plans</h3>
              <p>
                Get tailored study recommendations to help you achieve your goals faster.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Info Section */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h2>Contact Us</h2>
          <div className="contact-details">
            <p>Email: support@studybuddy.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 StudyBuddy Lane, Knowledge City</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Help;