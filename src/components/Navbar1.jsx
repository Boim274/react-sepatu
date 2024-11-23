import { HomeIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'; // Gunakan versi yang benar sesuai pustaka
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar1 = () => {
  return (
    <nav className="bg-sky-950 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo dan Nama */}
        <div className="flex items-center space-x-3">
          <img src="./src/assets/logo-sepatu.png" alt="BoimSepatu Logo" className="w-10 h-10 rounded-full" />
          <h2 className="text-lg font-bold">Boim Sepatu.</h2>
        </div>

        {/* Menu Navigasi */}
        <ul className="flex space-x-8">
          {/* Home */}
          <li>
            <Link
              to="/homepages"
              className="flex flex-col items-center space-y-1 text-gray-300 hover:text-white"
            >
              <HomeIcon className="h-6 w-6" />
              
            </Link>
          </li>

          {/* Keranjang */}
          <li>
            <Link
              to="/cart"
              className="flex flex-col items-center space-y-1 text-gray-300 hover:text-white"
            >
              <ShoppingCartIcon className="h-6 w-6" />
             
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar1;
