import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validation, setValidation] = useState([]);

  // Navigate
  const navigate = useNavigate();

  // Register handler function
  const registerHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);

    try {
      await axios.post("http://localhost:8000/api/register", formData);
      navigate("/dashboard");
    } catch (error) {
      setValidation(error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={registerHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
            {validation.name && (
              <p className="text-sm text-red-500 mt-1">{validation.name[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
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
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {validation.password && (
              <p className="text-sm text-red-500 mt-1">{validation.password[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <small>
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Login here
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Register;
