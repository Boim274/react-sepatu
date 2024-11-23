import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function UserEdit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get(`http://localhost:8000/api/users/${id}`);
        const user = userResponse.data.data;
        setName(user.name);
        setEmail(user.email);
        setSelectedRole(user.roles[0]?.id); // Assuming user can have only one role

        const rolesResponse = await api.get('http://localhost:8000/api/roles'); // Assuming there's an endpoint to fetch roles
        setRoles(rolesResponse.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (password) formData.append("password", password);
    if (selectedRole) formData.append("role", selectedRole); // Append role if selected

    try {
      await api.post(`http://localhost:8000/api/users/${id}`, formData, {
        headers: { "X-HTTP-Method-Override": "PUT" },
      });
      navigate("/users");
    } catch (error) {
      setErrors(error.response.data.errors || {});
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/users")}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-sm"
          >
            Back
          </button>
          <h3 className="text-xl font-semibold text-gray-800">Edit User</h3>
        </div>

        <form onSubmit={updateUser} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {errors.name && (
              <div className="mt-2 text-red-600 text-sm">{errors.name[0]}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && (
              <div className="mt-2 text-red-600 text-sm">{errors.email[0]}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (Leave empty if not changing)"
            />
            {errors.password && (
              <div className="mt-2 text-red-600 text-sm">{errors.password[0]}</div>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && (
              <div className="mt-2 text-red-600 text-sm">{errors.role[0]}</div>
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
