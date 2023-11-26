import { Link, Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">User Dashboard</h1>
      <nav className="mb-6">
        <ul className="flex flex-wrap justify-center gap-4">
          <li>
            <Link
              to="/dashboard/create-survey"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Create Survey
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/surveys"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            >
              Your Surveys
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/active-surveys"
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300"
            >
              Active Surveys
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/responses"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300"
            >
              Your Responses
            </Link>
          </li>
        </ul>
      </nav>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
