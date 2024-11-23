import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Navbar from "../../components/Navbar";
import axios from "axios";

export default function ProductIndex() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Data yang difilter
  const [searchTerm, setSearchTerm] = useState(""); // Kata kunci pencarian
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const [itemsPerPage] = useState(5); // Jumlah item per halaman
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchDataProducts = async () => {
    try {
      const response = await api.get("http://localhost:8000/api/products");
      setProducts(response.data.data.data);
      setFilteredProducts(response.data.data.data); // Inisialisasi data yang difilter
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchDataProducts();
    fetchUserData();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await api.delete(`/api/products/${id}`);
        fetchDataProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const logoutHandler = async () => {
    try {
      await api.post(
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

  // Logika untuk pencarian
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category?.name?.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset halaman ke pertama saat melakukan pencarian
  };

  // Hitung total halaman
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Data untuk halaman aktif
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar user={user} toggleTheme={toggleTheme} logoutHandler={logoutHandler} />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold ">KELOLA SEPATU</h3>
          <Link
            to="/products/create"
            className="btn btn-primary px-6 py-2 text-white rounded-lg shadow hover:shadow-lg hover:bg-blue-600 transition duration-200"
          >
            + Add Product
          </Link>
        </div>

        {/* Input untuk pencarian */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Cari berdasarkan nama atau kategori..."
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-sky-600 to-blue-500 text-white">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">No</th>
                <th className="px-4 py-3 text-sm font-semibold">Image</th>
                <th className="px-4 py-3 text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-sm font-semibold">Brand</th>
                <th className="px-4 py-3 text-sm font-semibold">Description</th>
                <th className="px-4 py-3 text-sm font-semibold">Price</th>
                <th className="px-4 py-3 text-sm font-semibold">Stock</th>
                <th className="px-4 py-3 text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition duration-200 text-center">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index + 1 + (currentPage - 1) * itemsPerPage}.
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md border border-gray-200"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.brand}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">
                      {product.description}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">Rp {product.price}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.stock}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.category?.name || "Tidak Ada"}
                    </td>
                    <td className="px-4 py-3 flex justify-center space-x-2">
                      <Link
                        to={`/products/edit/${product.id}`}
                        className="btn btn-sm btn-outline btn-primary px-4 py-1 text-sm rounded-md mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="btn btn-sm btn-outline btn-error px-4 py-1 text-sm rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    Data Produk Tidak Ditemukan!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 mx-1 rounded-md ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
