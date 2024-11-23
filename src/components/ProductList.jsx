import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "/src/api";  // Import the API configuration

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product data from API
    const fetchData = async () => {
      try {
        const response = await api.get('http://localhost:8000/api/products');  // Use the relative URL
        setProducts(response.data.data); // Assuming the API returns 'data' as the product list
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
   
  }, []);

 
  
  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-red-500 text-center text-xl">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Produk Kami</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="card shadow-xl bg-amber-500">
              <figure>
                <img
                  src={product.image}  // Use the correct image URL from the response
                  alt={product.name}
                  className="w-32 h-32 mx-auto my-2"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-white">
                  {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                </h2>
                <p className="text-white text-sm">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold text-white">Rp {product.price}</span>
                  <span className="text-sm text-gray-100">{product.stock} in stock</span>
                </div>
                <Link
                  to={`/products/${product.id}`}  // Link to product details page
                  className="btn border-none bg-sky-800 text-white mt-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
