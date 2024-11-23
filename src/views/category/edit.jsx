import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function CategoryEdit() {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDetailCategory = async () => {
    try {
      const response = await api.get(`/api/categories/${id}`);
      setName(response.data.data.name);
    } catch (error) {
      setErrors(["Error fetching category details."]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailCategory();
  }, [id]);

  const updateCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("_method", "PUT");

    try {
      await api.post(`/api/categories/${id}`, formData);
      navigate("/categories");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Error updating category."]);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

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
          <h3 className="text-lg font-semibold">Edit Category</h3>
        </div>

        <form onSubmit={updateCategory}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter category name"
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
