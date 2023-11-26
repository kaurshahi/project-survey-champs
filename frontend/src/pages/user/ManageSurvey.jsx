import { useState, useEffect } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";

const ManageSurvey = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await api.get(`/surveys/${surveyId}`);
        setSurvey(response.data);
      } catch (err) {
        setError("Error fetching survey details.");
        console.error(err);
      }
      setLoading(false);
    };

    fetchSurvey();
  }, [surveyId]);

  const handleEndSurvey = async () => {
    try {
      const newSurvey = {
        ...survey,
        expirationDate: new Date(),
      };
      console.log(newSurvey);
      const response = await api.put(`/surveys/${surveyId}`, newSurvey);
      setSurvey(response.data);
      alert("Survey ended successfully.");
    } catch (err) {
      setError("Error ending the survey.");
      console.error(err);
    }
  };

  const handleDeleteSurvey = async () => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      try {
        await api.delete(`/surveys/${surveyId}`);
        navigate("/dashboard/surveys");
      } catch (err) {
        setError("Error deleting the survey.");
        console.error(err);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!survey) {
    return <p>Survey not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Manage Survey: {survey.title}
        </h2>

        <div className="mb-4">
          <p>
            <strong>Survey Title:</strong> {survey.title}
          </p>
        </div>
        <div className="mb-4">
          <button
            onClick={() => navigate(`/dashboard/surveys/${surveyId}/analysis`)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            View Responses
          </button>
          <button
            onClick={handleEndSurvey}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            End Survey
          </button>
          <button
            onClick={handleDeleteSurvey}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSurvey;
