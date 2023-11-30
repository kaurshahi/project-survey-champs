import { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const ActiveSurveys = () => {
  const [activeSurveys, setSurveys] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchActiveSurveys = async () => {
      try {
        const response = await api.get("/surveys/active");
        setSurveys(response.data);
      } catch (err) {
        console.error("Error fetching active surveys:", err);
      }
    };

    fetchActiveSurveys();
  }, []);
  const handleSurveyResponse = (surveyId) => {
    navigate(`/survey/${surveyId}/respond`);
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Active Surveys
        </h2>
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
          <p className="text-gray-700">No active surveys available.</p>
        )}
      </div>
    </div>
  );
};

export default ActiveSurveys;
