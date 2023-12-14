import { useState, useEffect, useContext } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const SurveyResponseForm = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await api.get(`/surveys/${surveyId}`);
        setSurvey(response.data);
        initializeResponses(response.data.questions);
      } catch (err) {
        setError("Error fetching survey.");
        console.error(err);
      }
      setLoading(false);
    };

    fetchSurvey();
  }, [surveyId]);

  const initializeResponses = (questions) => {
    const initialResponses = questions.map((question) => {
      switch (question.type) {
        case "shortAnswer":
          return {
            questionId: question._id,
            response: "",
          };
        case "agreeDisagree":
          return {
            questionId: question._id,
            response: "",
          };
        case "multipleChoice":
          return {
            questionId: question._id,
            response: [],
          };
        default:
          return {
            questionId: question._id,
            response: "",
          };
      }
    });
    setResponses(initialResponses);
  };

  const handleChange = (questionId, value, multipleChoice = false) => {
    setResponses((prevResponses) =>
      prevResponses.map((response) => {
        if (response.questionId === questionId) {
          return {
            questionId: questionId,
            response: multipleChoice
              ? toggleMultipleChoiceResponse(response.response, value)
              : value,
          };
        }
        return response;
      })
    );
  };

  const toggleMultipleChoiceResponse = (currentResponses, value) => {
    const currentSet = new Set(currentResponses);
    if (currentSet.has(value)) {
      currentSet.delete(value);
    } else {
      currentSet.add(value);
    }
    return Array.from(currentSet);
  };

  const renderQuestionInput = (question) => {
    switch (question.type) {
      case "shortAnswer":
        return (
          <input
            type="text"
            value={responses[question._id]}
            onChange={(e) => handleChange(question._id, e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        );
      case "agreeDisagree":
        return ["Agree", "Disagree"].map((option, index) => (
          <label key={index} className="block">
            <input
              type="radio"
              name={question._id}
              value={option}
              checked={
                responses.find((resp) => resp.questionId === question._id)
                  ?.response === option
              }
              onChange={(e) => handleChange(question._id, e.target.value)}
              className="mr-2"
            />
            {option}
          </label>
        ));
      case "multipleChoice":
        return question.options.map((option, index) => {
          const questionResponse = responses.find(
            (response) => response.questionId === question._id
          );
          const isChecked =
            questionResponse && questionResponse.response.includes(option.text);

          return (
            <label key={index} className="block">
              <input
                type="checkbox"
                name={question._id}
                value={option.text}
                checked={isChecked}
                onChange={(e) =>
                  handleChange(question._id, e.target.value, true)
                }
                className="mr-2"
              />
              {option.text}
            </label>
          );
        });

      default:
        return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hasResponded = localStorage.getItem(`respondedToSurvey_${surveyId}`);
    if (hasResponded) {
      setError("You have already submitted a response to this survey.");
      return;
    }
    try {
      await api.post(`/surveys/${surveyId}/responses`, {
        responses,
        respondent: user?.id || "",
      });
      localStorage.setItem(`respondedToSurvey_${surveyId}`, "true");
      navigate("/");
    } catch (err) {
      setError("Error submitting response.");
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading survey...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          {survey?.title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {survey?.questions.map((question) => (
            <div key={question._id} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {question.text}
              </label>
              {renderQuestionInput(question)}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Submit Response
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyResponseForm;
