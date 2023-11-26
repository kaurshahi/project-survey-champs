import { useState } from "react";
import api from "../../api";

import { useNavigate } from "react-router-dom";

const CreateSurvey = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [activeDate, setActiveDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", type: "shortAnswer", options: [] },
    ]);
  };

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === index) {
        return { ...question, [key]: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        return {
          ...question,
          options: [...question.options, { text: "" }],
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        const updatedOptions = question.options.map((option, j) => {
          if (j === optionIndex) {
            return { ...option, text: value };
          }
          return option;
        });
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    try {
      await api.post("/surveys", {
        title,
        questions,
        activeDate,
        expirationDate,
      });
      setSuccess("Survey created successfully.");

      navigate("/dashboard/surveys");
    } catch (err) {
      console.error("Error creating survey:", err);
      setError("Failed to create survey. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Create a New Survey
        </h2>
        {error && (
          <div className="text-red-500 text-sm italic mb-3">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-sm italic mb-3">{success}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {questions.map((question, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Question {index + 1}:
              </label>
              <input
                type="text"
                value={question.text}
                onChange={(e) =>
                  handleQuestionChange(index, "text", e.target.value)
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <select
                value={question.type}
                onChange={(e) =>
                  handleQuestionChange(index, "type", e.target.value)
                }
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="shortAnswer">Short Answer</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="agreeDisagree">Agree/Disagree</option>
              </select>
              {question.type === "multipleChoice" && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e.target.value)
                      }
                      placeholder={`Option ${optionIndex + 1}`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddOption(index)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            Add Question
          </button>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="activeDate"
            >
              Active Date:
            </label>
            <input
              id="activeDate"
              type="date"
              value={activeDate}
              onChange={(e) => setActiveDate(e.target.value)}
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="expirationDate"
            >
              Expiration Date:
            </label>
            <input
              id="expirationDate"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Create Survey
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;
