import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f3b4d] via-[#245c64] to-[#2c6975] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-extrabold text-[#E0E0E0] mb-4">
        Welcome to CVBuilder
      </h1>
      <p className="text-lg text-[#E0E0E0] max-w-2xl mb-8">
        Create professional resumes effortlessly with our easy-to-use resume builder. 
        Customize, download, and get ready for your dream job.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full font-semibold shadow-lg hover:scale-105 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-white text-green-700 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Landing;
