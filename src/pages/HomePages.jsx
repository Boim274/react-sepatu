// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdBanner from '../components/AdBanner';
import ProductList from '../components/ProductList';
import Navbar1 from '../components/Navbar1';

function HomePage() {
  const [cart, setCart] = useState([]);

  // Fungsi untuk menambahkan produk ke keranjang
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => 
        item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar1 />
      <AdBanner />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
      </Routes>
    </div>
  );
}

export default HomePage;
