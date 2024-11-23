import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  // Define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({});

  // Define navigate
  const navigate = useNavigate();

  // useEffect hook
  useEffect(() => {
    // Check token
    if (localStorage.getItem("token")) {
      // Redirect to dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  // loginHandler function
  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );

      // Set token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        setValidation(error.response.data); // Assign error to validation state
      } else {
        setValidation({ message: "An unexpected error occurred." });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h3>
        {validation.message && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {validation.message}
          </div>
        )}
        <form onSubmit={loginHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {validation.email && (
              <p className="text-sm text-red-500 mt-1">{validation.email[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {validation.password && (
              <p className="text-sm text-red-500 mt-1">
                {validation.password[0]}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <small>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
