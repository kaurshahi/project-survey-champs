import { useState, useEffect } from "react";
import api from "../../api";

const ResponsesList = ({ surveyId }) => {
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Survey Responses
        </h2>

        {responses.length === 0 ? (
          <p className="text-gray-600">No responses yet.</p>
        ) : (
          responses.map((response, index) => (
            <div key={response._id} className="mb-6">
              <h3 className="font-semibold text-lg mb-2">
                Response {index + 1}
              </h3>
              <ul className="list-disc list-inside ml-4 text-gray-700">
                {response.responses.map((res, idx) => (
                  <li key={idx} className="mb-2">
                    <p>
                      <strong>Question ID:</strong> {res.questionId}
                    </p>
                    {Array.isArray(res.response) ? (
                      res.response.map((answer, answerIdx) => (
                        <p key={answerIdx} className="ml-4">
                          - {answer}
                        </p>
                      ))
                    ) : (
                      <p>
                        <strong>Answer:</strong> {res.response}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResponsesList;
