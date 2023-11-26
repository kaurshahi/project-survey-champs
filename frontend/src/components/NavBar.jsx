import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center bg-white text-[#07162A] px-4 py-2 rounded-full hover:bg-blue-300"
        >
          <img src="/logo.png" alt="Survey Champs Logo" className="h-12 mr-3" />
          <span className="font-semibold text-lg">Survey Champs</span>
        </Link>

        <div>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard/surveys"
                className="px-3 py-2 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="px-3 py-2 rounded hover:bg-gray-700"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 rounded hover:bg-gray-700">
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 rounded hover:bg-gray-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
