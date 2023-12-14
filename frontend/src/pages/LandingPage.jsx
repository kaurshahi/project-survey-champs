import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
const LandingPage = () => {
  const [activeSurveys, setActiveSurveys] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchActiveSurveys = async () => {
      try {
        const response = await api.get("/surveys/active");

        setActiveSurveys(response.data);
      } catch (error) {
        console.error("Error fetching active surveys", error);
      }
    };

    fetchActiveSurveys();
  }, []);

  const handleSurveyResponse = (surveyId) => {
    navigate(`/survey/${surveyId}/respond`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-lg mx-auto py-6">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
          <h1 className="text-gray-700 text-2xl font-bold mb-4">
            Welcome to the Survey System
          </h1>
          <p className="text-gray-600 mb-6">
            Create custom surveys, collect responses, and analyze data.
          </p>
          <div className="actions mb-6">
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-gray-700 text-xl font-bold mb-4">Features</h2>
          <ul className="text-gray-600 list-disc list-inside">
            <li>Create various types of surveys</li>
            <li>Receive real-time responses</li>
            <li>Analyze survey data with ease</li>
          </ul>
        </div>
        <div className="max-w-lg mx-auto py-6">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-gray-700 text-xl font-bold mb-4">
              Participate in a Survey
            </h2>
            <p className="text-gray-600 mb-6">
              Choose a survey to provide your response.
            </p>
            {activeSurveys.length > 0 ? (
              <ul className="text-gray-600 list-disc list-inside">
                {activeSurveys.map((survey) => {
                  const responded = localStorage.getItem(
                    "respondedToSurvey_" + survey._id
                  );
                  return (
                    <li key={survey._id} className="mb-2">
                      {survey.title}
                      {responded ? (
                        <button
                          disabled
                          className="ml-2 bg-gray-300 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Responded
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSurveyResponse(survey._id)}
                          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Respond
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No active surveys available right now.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
