import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBox, FaList, FaUsers, FaShoppingCart, FaMoon, FaSignOutAlt } from "react-icons/fa";

export default function Navbar({ user, toggleTheme, logoutHandler }) {
  return (
    <div className="navbar bg-base-200 shadow-lg">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content mt-3 z-[1] w-52 bg-base-100 shadow rounded-box"
          >
            <li>
              <Link to="/">
                <FaHome /> Homepage
              </Link>
            </li>
            <li>
              <Link to="/products">
                <FaBox /> Kelola Product
              </Link>
            </li>
            <li>
              <Link to="/categories">
                <FaList /> Kelola Category
              </Link>
            </li>
            <li>
              <Link to="/users">
                <FaUsers /> Kelola User
              </Link>
            </li>
            <li>
              <Link to="/orders">
                <FaShoppingCart /> Kelola Order
              </Link>
            </li>
          </ul>
        </div>
        {/* Navbar Brand */}
        <Link to="/" >
        <div className="flex items-center">
        <img src="./src/assets/logo-sepatu.png" alt="" className="w-8 h-8" />
        <h3 className="text-lg font-semibold ml-2">Dashboard Admin.</h3>
        </div>
          
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">
              <FaHome /> Homepage
            </Link>
          </li>
          <li>
            <Link to="/products">
              <FaBox /> Kelola Product
            </Link>
          </li>
          <li>
            <Link to="/categories">
              <FaList /> Kelola Category
            </Link>
          </li>
          <li>
            <Link to="/users">
              <FaUsers /> Kelola User
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <FaShoppingCart /> Kelola Order
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {/* User Name */}
        <div className="hidden lg:block mr-3">
          <h3 className="text-lg font-semibold">{user?.name || "Guest"}</h3>
        </div>
        {/* Profile Menu */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex="0"
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profile"
                src={user?.profileImage || "./src/assets/profile.png"}
              />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow bg-slate-600 text-white"
          >
            <li>
              <button onClick={toggleTheme}>
                <FaMoon /> Ganti Tema
              </button>
            </li>
            <li>
              <button onClick={logoutHandler}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
