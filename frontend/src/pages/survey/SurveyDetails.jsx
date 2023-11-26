import { useState, useEffect } from "react";
import api from "../../api";
import { Link, useParams } from "react-router-dom";
import ResponsesList from "../response/ResponseList";

const SurveyDetails = () => {
  const { surveyId } = useParams();
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

  if (loading) {
    return <p>Loading survey details...</p>;
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
          Survey Details
        </h2>

        <p className="text-gray-700 mb-2">
          <strong>Title:</strong> {survey.title}
        </p>

        {survey.description && (
          <p className="text-gray-700 mb-2">
            <strong>Description:</strong> {survey.description}
          </p>
        )}

        <p className="text-gray-700 mb-2">
          <strong>Active Date:</strong> {survey.activeDate}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Expiration Date:</strong> {survey.expirationDate}
        </p>

        <h3 className="text-gray-700 text-xl font-semibold mb-3">Questions:</h3>
        {survey.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-700 font-medium">
              <strong>Question {index + 1}:</strong> {question.text}
            </p>

            {question.type === "multipleChoice" && question.options && (
              <ul className="list-disc list-inside ml-4 text-gray-700">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option.text}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <Link
          to="/dashboard/surveys"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Go Back
        </Link>

        <ResponsesList surveyId={surveyId}></ResponsesList>
      </div>
    </div>
  );
};

export default SurveyDetails;
