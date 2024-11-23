import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import API
import api from "../../api";

export default function ProductEdit() {
  // define state
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]);

  // state validation
  const [errors, setErrors] = useState([]);

  // useNavigate and useParams
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the route

  // Fetch product and categories data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoriesResponse] = await Promise.all([
          api.get(`http://localhost:8000/api/products/${id}`),
          api.get("http://localhost:8000/api/categories"),
        ]);

        const product = productResponse.data.data;
        setName(product.name);
        setBrand(product.brand);
        setDescription(product.description);
        setCategoryId(product.category_id);
        setPrice(product.price);
        setStock(product.stock);

        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // update product
  const updateProduct = async (e) => {
    e.preventDefault();

    // init FormData
    const formData = new FormData();

    // append data
    if (image) formData.append("image", image); // Append only if image is updated
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("category_id", categoryId);
    formData.append("price", price);
    formData.append("stock", stock);

    // send data with API
    try {
      await api.post(`http://localhost:8000/api/products/${id}`, formData, {
        headers: { "X-HTTP-Method-Override": "PUT" },
      });
      // redirect to products index
      navigate("/products");
    } catch (error) {
      // set errors response to state "errors"
      setErrors(error.response.data.errors || {});
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
          <h3 className="text-xl font-semibold text-gray-800">Edit Product</h3>
        </div>

        <form onSubmit={updateProduct} className="space-y-6">
          {/* Image */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.image && (
              <div className="mt-2 text-red-600 text-sm">{errors.image[0]}</div>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
            />
            {errors.name && (
              <div className="mt-2 text-red-600 text-sm">{errors.name[0]}</div>
            )}
          </div>

          {/* Brand */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Brand</label>
            <input
              type="text"
              value={brand}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
            />
            {errors.brand && (
              <div className="mt-2 text-red-600 text-sm">{errors.brand[0]}</div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={description}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              placeholder="Product Description"
            ></textarea>
            {errors.description && (
              <div className="mt-2 text-red-600 text-sm">{errors.description[0]}</div>
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
            {errors.category_id && (
              <div className="mt-2 text-red-600 text-sm">{errors.category_id[0]}</div>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price</label>
            <input
              type="number"
              value={price}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
            {errors.price && (
              <div className="mt-2 text-red-600 text-sm">{errors.price[0]}</div>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Stock</label>
            <input
              type="number"
              value={stock}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
            />
            {errors.stock && (
              <div className="mt-2 text-red-600 text-sm">{errors.stock[0]}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
