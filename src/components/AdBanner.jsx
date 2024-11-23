// src/components/AdBanner.js
import React from 'react';

const AdBanner = () => {
  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto text-center">
        <img
          src="https://via.placeholder.com/1200x300/FF5733/FFFFFF?text=Iklan+Produk"
          alt="Banner Iklan"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default AdBanner;
