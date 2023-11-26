import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api";

const UserSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await api.get("/surveys");

        setSurveys(response.data);
      } catch (err) {
        console.error("Error fetching surveys:", err);
      }
    };

    if (user) {
      fetchSurveys();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">Your Surveys</h2>
        {surveys.length > 0 ? (
          <ul className="list-disc list-inside">
            {surveys.map((survey) => (
              <li key={survey._id} className="mb-2">
                <Link
                  to={`/survey/${survey._id}/details`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {survey.title}
                </Link>
                <span className="mx-2">|</span>
                <Link
                  to={`/dashboard/surveys/${survey._id}/manage`}
                  className="text-green-500 hover:text-green-700"
                >
                  Manage Survey
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">You have not created any surveys yet.</p>
        )}
        <Link
          to="/dashboard/create-survey"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 inline-block"
        >
          Create New Survey
        </Link>
      </div>
    </div>
  );
};

export default UserSurveys;
