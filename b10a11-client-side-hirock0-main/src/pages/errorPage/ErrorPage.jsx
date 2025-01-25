// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Fade } from "react-awesome-reveal";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700 p-6">
      <Fade>
        <DotLottieReact
          src="https://lottie.host/fb0144f2-dc65-4d91-8d6a-dc5994a5b9ff/RFHzjRC2eI.lottie"
          loop
          autoplay
        />
      </Fade>
      <motion.h1
        className="text-4xl font-bold mt-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Oops! Page not found.
      </motion.h1>
      <p className="text-lg text-gray-500 mt-4 text-center">
        Sorry, the page you’re looking for doesn’t exist. Try heading back to
        the homepage.
      </p>
      <Link to="/" className="mt-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
        >
          <FaHome className="mr-2" />
          Go Home
        </motion.button>
      </Link>
    </div>
  );
};

export default ErrorPage;
