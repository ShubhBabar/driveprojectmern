const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Welcome to MyDrive
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8">
          Securely store, manage, and share your files with ease. Join us today
          and experience seamless cloud storage.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4">
          <a
            href="/login"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold shadow-lg transition-all mb-4 sm:mb-0"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold shadow-lg transition-all"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
