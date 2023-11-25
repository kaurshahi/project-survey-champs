import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:3000/api/users/" + user.id,
        {
          email: user.email,
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      setName(response.data.name);
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError("Profile update failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-md mx-auto py-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="block text-gray-700 text-xl font-bold mb-2">
            Update Profile
          </h2>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          {success && (
            <p className="text-green-500 text-xs italic">{success}</p>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
