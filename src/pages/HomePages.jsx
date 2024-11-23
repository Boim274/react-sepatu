// src/pages/HomePage.jsx
import React, { useState } from 'react';
import Navbar1 from '../components/Navbar1';
import AdBanner from '../components/AdBanner';
import ProductList from '../components/ProductList';



function HomePage() {
 

  return (
    <div className="min-h-screen flex flex-col">
    <Navbar1 />
    <AdBanner />
    <ProductList/>
    </div>
  );
}

export default HomePage;
