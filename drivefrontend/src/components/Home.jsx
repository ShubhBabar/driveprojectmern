import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [file, setFile] = useState(null);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setFile(null);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("File uploaded successfully!");
        closePopup();
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(error.response?.data?.message || "File upload failed!");
    }
  };

  // Check authentication
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const username = localStorage.getItem("username") || "Guest";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  const onLogout = async () => {
    try {
      const response = await axios.get("/user/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        navigate("/");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Error logging out. Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      <div className="absolute top-5 right-5">
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Welcome, <strong>{username}</strong>!
      </h2>
      <button
        onClick={openPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload File
      </button>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            ref={popupRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative"
          >
            <h2 className="text-2xl font-bold mb-4">Upload File</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full border border-gray-300 rounded p-2 mb-4"
                required
              />
              <button
                type="submit"
                className={`w-full bg-green-500 text-white py-2 rounded ${
                  !file ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                }`}
                disabled={!file}
              >
                Upload File
              </button>
            </form>
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
