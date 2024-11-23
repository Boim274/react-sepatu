// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar1 = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">eCommerce</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
          <li><Link to="/cart" className="hover:text-gray-400">Keranjang</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar1;
