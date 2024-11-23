import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function ProductCreate() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]); // Initialize categories state
  const [errors, setErrors] = useState([]); // Initialize errors state
  const navigate = useNavigate();

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("http://localhost:8000/api/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle file change for image upload
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Store product and handle validation
  const storeProduct = async (e) => {
    e.preventDefault();

    // Reset errors before validation
    setErrors([]);

    // Validate required fields
    const validationErrors = [];

    if (!image) validationErrors.push("Product image is required.");
    if (!name) validationErrors.push("Product name is required.");
    if (!brand) validationErrors.push("Brand is required.");
    if (!description) validationErrors.push("Description is required.");
    if (!categoryId) validationErrors.push("Category is required.");
    if (!price) validationErrors.push("Price is required.");
    if (!stock) validationErrors.push("Stock is required.");

    // If there are validation errors, set them and stop the form submission
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If no errors, proceed to submit the form
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("category_id", categoryId);
    formData.append("price", price);
    formData.append("stock", stock);

    // Submit the form data
    try {
      await api.post("http://localhost:8000/api/products", formData);
      navigate("/products");
    } catch (error) {
      setErrors(error.response?.data?.errors || ["An error occurred while creating the product."]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/products")}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-sm"
          >
            Back
          </button>
          <h3 className="text-xl font-semibold text-gray-800">Add New Product</h3>
        </div>

        <form onSubmit={storeProduct} className="space-y-6">
          {/* Image */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.includes("Product image is required.") && (
              <div className="mt-2 text-red-600 text-sm">Product image is required.</div>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
            />
            {errors.includes("Product name is required.") && (
              <div className="mt-2 text-red-600 text-sm">Product name is required.</div>
            )}
          </div>

          {/* Brand */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Brand</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
            />
            {errors.includes("Brand is required.") && (
              <div className="mt-2 text-red-600 text-sm">Brand is required.</div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              placeholder="Product Description"
            ></textarea>
            {errors.includes("Description is required.") && (
              <div className="mt-2 text-red-600 text-sm">Description is required.</div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.length === 0 ? (
                <option>Loading categories...</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            {errors.includes("Category is required.") && (
              <div className="mt-2 text-red-600 text-sm">Category is required.</div>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
            {errors.includes("Price is required.") && (
              <div className="mt-2 text-red-600 text-sm">Price is required.</div>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Stock</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
            />
            {errors.includes("Stock is required.") && (
              <div className="mt-2 text-red-600 text-sm">Stock is required.</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
