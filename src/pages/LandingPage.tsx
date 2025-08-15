import React from "react";

const App: React.FC = () => {
  return (
    <div className="bg-deep-space text-white">
      {/* Home Section */}
      <section id = "home" className="flex flex-col items-center justify-center w-full min-h-screen px-6 md:px-12 text-center bg-deep-space">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4">
          Build Your Professional CV
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-3xl mb-8 text-gray-300">
          Create a stunning, fully customizable CV in minutes. Impress recruiters with a clean, professional design and showcase your skills effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/login"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg shadow-lg transition duration-300"
          >
            Get Started
          </a>
          <a
            href="#about"
            className="px-6 sm:px-8 py-3 sm:py-4 border border-white text-white hover:bg-white hover:text-deep-space font-semibold rounded-lg transition duration-300"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id = "about" className="flex flex-col items-center justify-center w-full px-6 md:px-12 py-16 bg-deep-space text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8">
          About CV Builder
        </h2>
        <p className="max-w-3xl mb-16 text-base sm:text-lg md:text-xl text-gray-300">
          We help you create professional, visually appealing CVs quickly and effortlessly. Our platform is designed to save your time while making your profile shine.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl w-full">
          {/* Card 1 */}
          <div className="bg-gradient-to-r from-purple-700 via-purple-900 to-indigo-800 p-8 sm:p-10 rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl">
            <div className="mb-6 flex justify-center text-white">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">Easy to Use</h3>
            <p className="text-gray-200 text-sm sm:text-base">
              Intuitive interface that allows you to build your CV in minutes without any technical skills.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-r from-green-500 via-teal-600 to-cyan-700 p-8 sm:p-10 rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl">
            <div className="mb-6 flex justify-center text-white">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">Professional Design</h3>
            <p className="text-gray-200 text-sm sm:text-base">
              Pre-built templates that follow industry standards to impress recruiters.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-r from-pink-500 via-red-600 to-orange-600 p-8 sm:p-10 rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl">
            <div className="mb-6 flex justify-center text-white">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v-4a4 4 0 014-4h12"></path>
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">Export & Share</h3>
            <p className="text-gray-200 text-sm sm:text-base">
              Download your CV as PDF or share it directly with potential employers.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id = "contact" className="flex flex-col md:flex-row items-start justify-center w-full px-6 md:px-12 py-16 bg-deep-space text-white">
        {/* Left Column */}
        <div className="md:w-1/2 mb-12 md:mb-0 md:pr-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
          <div className="w-16 h-1 bg-blue-600 mb-6"></div>
          <p className="text-gray-300 mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="space-y-4 text-gray-300 text-sm sm:text-base">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12h2m-6 6h.01M12 6h.01M12 12h.01M12 18h.01M6 12h.01M6 6h.01M6 18h.01" />
              </svg>
              prasadrudra279@gmail.com
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l3 7-1.5 3h-2l-1-2.5L3 5zm18 0h-2l-3 7 1.5 3h2l1-2.5L21 5z" />
              </svg>
              +91 6370923986
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12l4.243-4.243a8 8 0 10-11.314 11.314L12 18.586l5.657-5.657z" />
              </svg>
              Kendrapara, Bhubaneswar, Odisha
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="md:w-1/2 md:pl-6 w-full">
          <form className="w-full space-y-4 sm:space-y-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              rows={4}
              placeholder="Message"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-deep-space text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          {/* Branding */}
          <div className="md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">CVBuilder</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Build professional resumes easily and export them in PDF. Your career, your way.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
              <li><a href="#home" className="hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">prasadrudra279@gmail.com</p>
            <div className="flex gap-4 text-sm sm:text-base">
              <a href="https://github.com/RudraP2004" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-600 transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/rudra-prasad-baral" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-600 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} CVBuilder. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
