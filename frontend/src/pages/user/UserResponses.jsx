import { useState, useEffect, useContext } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UserResponses = () => {
  const [responses, setResponses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserResponses = async () => {
      try {
        const response = await api.get("/responses");
        setResponses(response.data);
      } catch (err) {
        console.error("Error fetching user responses:", err);
      }
    };

    if (user) {
      fetchUserResponses();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Your Survey Responses
        </h2>
        {responses.length > 0 ? (
          <ul className="list-disc list-inside">
            {responses.map((response) => (
              <li key={response._id} className="mb-2">
                <Link
                  to={`/survey/${response.survey._id}/response/${response._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Response to {response.survey.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">
            You have not responded to any surveys yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserResponses;
