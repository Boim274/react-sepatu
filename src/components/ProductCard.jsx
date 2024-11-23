// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="card w-80 bg-white shadow-xl p-4 rounded-lg">
      <figure>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg"/>
      </figure>
      <div className="card-body">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p>{product.description}</p>
        <p className="font-bold text-lg text-gray-700">Rp {product.price}</p>
        <div className="card-actions justify-end">
          <button onClick={() => addToCart(product)} className="btn btn-primary">
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
