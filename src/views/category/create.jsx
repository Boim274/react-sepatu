  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import api from "../../api";

  export default function CategoryCreate() {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const storeCategory = async (e) => {
      e.preventDefault();

      if (!name) {
        setErrors(["Category name is required."]);
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);

      try {
        await api.post("/api/categories", formData);
        setSuccessMessage("Category created successfully!");
        setTimeout(() => navigate("/categories"), 2000);
      } catch (error) {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors(["Something went wrong. Please try again."]);
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigate("/categories")}
              className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"
            >
              Back
            </button>
            <h3 className="text-lg font-semibold">Add New Category</h3>
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
              {successMessage}
            </div>
          )}

          <form onSubmit={storeCategory}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Category Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter category name"
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
