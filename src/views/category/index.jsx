import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Navbar from "../../components/Navbar";
import axios from "axios";

export default function CategoryIndex() {
  const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.post(
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

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const fetchDataCategories = async () => {
    try {
      const response = await api.get("http://localhost:8000/api/categories");
      if (response.data && response.data.status && response.data.data) {
        setCategories(response.data.data);
      } else {
        setCategories([]);
      }
    } catch (err) {
      setError("Error fetching categories");
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchDataCategories();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const deleteCategory = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
      try {
        await api.delete(`http://localhost:8000/api/categories/${id}`);
        fetchDataCategories();
      } catch (err) {
        setError("Error deleting category");
      }
    }
  };

  // if (loading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div>
      <Navbar user={user} toggleTheme={toggleTheme} logoutHandler={logoutHandler} />
      <div className="container mx-auto mt-5 mb-5 px-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">KELOLA KATEGORI</h3>
          <Link
            to="/categories/create"
            className="btn btn-primary px-6 py-2 text-white rounded-lg shadow hover:shadow-lg hover:bg-blue-600 transition duration-200"
          >
            + Add Category
          </Link>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-gradient-to-r from-sky-600 to-blue-500 text-white text-center">
              <tr>
                <th className="px-4 py-3  border-b-2 border-gray-200">No</th>
                <th className="px-4 py-3  border-b-2 border-gray-200">Name</th>
                <th className="px-4 py-3  border-b-2 border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-4 py-2 border-b">{index + 1}.</td>
                    <td className="px-4 py-2 border-b">{category.name}</td>
                    <td className="px-4 py-3 flex justify-center space-x-2">
                      <Link
                        to={`/categories/edit/${category.id}`}
                        className="btn btn-sm btn-outline btn-primary px-4 py-1 text-sm rounded-md mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="btn btn-sm btn-outline btn-error px-4 py-1 text-sm rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No categories found!
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
