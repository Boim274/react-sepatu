
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import React from "react";

const AdBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Bagian Kiri */}
        <div className="text-white space-y-4 lg:max-w-md">
          <span className="bg-blue-800 text-white text-xs font-medium px-3 py-1 rounded-full inline-block">
            #1 Toko Sepatu Bekasi
          </span>
          <h1 className="text-4xl font-bold leading-tight">Boim Sepatu.</h1>
          <p className="text-lg">
            Menjual Sepatu Keren, Murah, dan terupdate di BoimSepatu.
          </p>
          <button className="mt-4 bg-sky-950 text-white hover:bg-cyan-600 flex items-center px-6 py-3 rounded-full shadow-lg ">
            <h2>Belanja Sekarang </h2>
            <ShoppingBagIcon className="w-6 h-6 ml-2"/>
          </button>
        </div>

        {/* Bagian Kanan */}
        <div className="relative mt-8 lg:mt-0">
          <div className=" ">
            <img
              src="./src/assets/banner-sepatu.jpg" // Ganti dengan URL gambar sepatu Anda
              alt="Sepatu"
              className="rounded-lg shadow-lg h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black opacity-40 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
