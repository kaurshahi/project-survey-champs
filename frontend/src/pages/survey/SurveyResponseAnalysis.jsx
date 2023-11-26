import { useState, useEffect } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";

const SurveyResponseAnalysis = () => {
  const { surveyId } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await api.get(`/surveys/${surveyId}/responses`);
        setResponses(response.data);
      } catch (err) {
        setError("Error fetching responses.");
        console.error(err);
      }
      setLoading(false);
    };

    fetchResponses();
  }, [surveyId]);

  if (loading) {
    return <p>Loading responses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const totalResponses = responses.length;

  const questionAnalysis = responses.reduce((acc, response) => {
    response.responses.forEach((res) => {
      if (!acc[res.questionId]) {
        acc[res.questionId] = { count: 0 };
      }
      acc[res.questionId].count += 1;
    });
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Survey Response Analysis
        </h2>
        <p className="text-gray-700 mb-4">Total Responses: {totalResponses}</p>
        <h3 className="text-gray-700 text-xl font-semibold mb-3">
          Question-wise Summary:
        </h3>
        {Object.entries(questionAnalysis).map(([questionId, data]) => (
          <div key={questionId} className="mb-2">
            <p className="text-gray-700">
              <strong>Question ID {questionId}:</strong> {data.count} responses
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyResponseAnalysis;
