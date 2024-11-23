import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [dateTime, setDateTime] = useState({
    time: "",
    date: "",
    day: "",
  });
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

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      setDateTime({
        time: now.toLocaleTimeString("id-ID"),
        date: `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`,
        day: days[now.getDay()],
      });
    };

    const intervalId = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Navbar user={user} toggleTheme={toggleTheme} logoutHandler={logoutHandler} />
      <div className="container mx-auto p-6">
        {/* Welcome Section */}
        <div className="card bg-base-100 shadow-lg p-6 rounded-lg text-center">
          <h1 className="text-3xl font-bold text-primary">Selamat Datang, {user.name || "Guest"}!</h1>
          <p className="text-lg mt-2 text-gray-600">
            Kelola data sepatu dengan efisiensi.
          </p>
          <div className="mt-4 text-lg font-medium">
            <p>Jam: <span className="text-primary">{dateTime.time}</span></p>
            <p>Tanggal: <span className="text-primary">{dateTime.date}</span></p>
            <p>Hari: <span className="text-primary">{dateTime.day}</span></p>
          </div>
        </div>

        {/* Management Menu */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Menu Kelola</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => navigate("/categories")}
              className="btn btn-primary btn-block shadow-lg"
            >
              Kelola Category
            </button>
            <button
              onClick={() => navigate("/products")}
              className="btn btn-primary btn-block shadow-lg"
            >
              Kelola Product
            </button>
            <button
              onClick={() => navigate("/users")}
              className="btn btn-primary btn-block shadow-lg"
            >
              Kelola User
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="btn btn-primary btn-block shadow-lg"
            >
              Kelola Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
