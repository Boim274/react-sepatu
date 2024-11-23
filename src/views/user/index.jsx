import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../api";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function IndexUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch current logged-in user
  const fetchLoggedInUser = async () => {
    try {
      const response = await api.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data); // Make sure "data" matches backend response
    } catch (error) {
      handleApiError(error);
    }
  };

  // Fetch all users
  const fetchDataUsers = async () => {
    try {
      const response = await api.get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data); // Ensure "data" matches backend response structure
    } catch (error) {
      handleApiError(error);
    } 
   
  };

  // Handle errors globally
  const handleApiError = (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      console.error("API Error:", error);
      setError("An error occurred while processing your request.");
    }
  };

  // Logout handler
  const logoutHandler = async () => {
    try {
      await api.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      // Optimistically update UI
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      try {
        await axios.delete(`http://localhost:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchDataUsers(); // Refresh the list after deletion
      } catch (error) {
        handleApiError(error);
        // Revert UI update if deletion fails
        setUsers((prevUsers) => [...prevUsers, users.find((user) => user.id === id)]);
      }
    }
  };

  // Fetch data on mount
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchLoggedInUser();
      fetchDataUsers();
    }
  }, [token, navigate]);

 

  // Render error state
  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
  };


  return (
    <div>
       <Navbar user={user} toggleTheme={toggleTheme} logoutHandler={logoutHandler} />
      <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold ">KELOLA USER</h2>
        <Link to="/users/create"  className="btn btn-primary px-6 py-2 text-white rounded-lg shadow hover:shadow-lg hover:bg-blue-600 transition duration-200">
        + Add User
        </Link>
      </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center">
          <thead className="bg-gradient-to-r from-sky-600 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <span
                            key={role.id}
                            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                          >
                            {role.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No Role</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/users/edit/${user.id}`}
                        className="btn btn-sm btn-outline btn-primary px-4 py-1 text-sm rounded-md mr-2"
                      >
                         Edit
                      </Link>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn btn-sm btn-outline btn-error px-4 py-1 text-sm rounded-md"
                      >
                         Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
