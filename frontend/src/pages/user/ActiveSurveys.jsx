import { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const ActiveSurveys = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchActiveSurveys = async () => {
      try {
        const response = await api.get("/surveys");
        setSurveys(response.data);
      } catch (err) {
        console.error("Error fetching active surveys:", err);
      }
    };

    fetchActiveSurveys();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Active Surveys
        </h2>
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
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No active surveys available.</p>
        )}
      </div>
    </div>
  );
};

export default ActiveSurveys;
