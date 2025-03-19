import React from "react";
import "./index.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Navbar at the top of the page */}
      <nav className="navbar">
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About Us</Link>
    </li>
    <li>
        <Link to="/help">Help</Link></li>
  </ul>
</nav>

      {/* Main Content */}
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="title"
        >
          About StudyBuddy
        </motion.h1>

        {/* Key Points Section */}
        <motion.div
          className="points"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="point">
            <h3>Find Your Study Partner</h3>
            <p>
              Connect with like-minded learners to study together, share resources, and achieve your
              goals.
            </p>
          </div>

          <div className="point">
            <h3>Collaborate Effectively</h3>
            <p>
              Use our tools to schedule study sessions, track progress, and stay motivated.
            </p>
          </div>

          <div className="point">
            <h3>Learn Smarter</h3>
            <p>
              Get personalized recommendations and study plans tailored to your needs.
            </p>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="mission"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h2>Our Mission</h2>
          <p>
            At StudyBuddy, our mission is to make learning collaborative, fun, and effective. We
            believe that studying with others can unlock your full potential and help you achieve
            your academic and personal goals.
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="team"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <h2>Meet the Team</h2>
          <div className="team-members">
            <div className="member">
              <motion.img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <h3>Tanya Yadav</h3>
              <p>Member</p>
            </div>
            <div className="member">
              <motion.img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <h3>Jiya Gayawer</h3>
              <p>Member</p>
            </div>
            <div className="member">
              <motion.img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <h3>Anoushka Shrivastava</h3>
              <p>Member</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
  className="testimonials"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 2.5 }}
>
  <h2>What Our Users Say</h2>
  <div className="testimonial-scroll-container">
    <div className="testimonial-cards">
      <div className="testimonial">
        <p>
          "StudyBuddy has completely changed the way I study. I found amazing study partners
          and improved my grades significantly!"
        </p>
        <h3>- Sarah Lee</h3>
      </div>
      <div className="testimonial">
        <p>
          "The collaboration tools are fantastic. I can now track my progress and stay
          motivated throughout my learning journey."
        </p>
        <h3>- Michael Brown</h3>
      </div>
      <div className="testimonial">
        <p>
          "I love how easy it is to connect with others. StudyBuddy made studying fun and
          productive!"
        </p>
        <h3>- Emily Davis</h3>
      </div>
      <div className="testimonial">
        <p>
          "The personalized study plans are a game-changer. I finally feel in control of my
          learning."
        </p>
        <h3>- David Wilson</h3>
      </div>
    </div>
  </div>
</motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;