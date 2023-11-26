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
        <div>
          <Link to="/" className="text-xl font-semibold">
            Survey Champs
          </Link>
        </div>
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
