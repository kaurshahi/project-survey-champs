import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./components/user/LoginPage";
import RegistrationPage from "./components/user/RegistrationPage";
import ProfilePage from "./components/user/ProfilePage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import AuthProvider from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/user/DashboardPage";
import CreateSurvey from "./pages/survey/CreateSurvey";
import SurveyDetails from "./pages/survey/SurveyDetails";
import SurveyResponseForm from "./pages/survey/SurveyResponseForm";
import SurveyResponseAnalysis from "./pages/survey/SurveyResponseAnalysis";
import UserSurveys from "./pages/user/UserSurveys";
import ActiveSurveys from "./pages/user/ActiveSurveys";
import ManageSurvey from "./pages/user/ManageSurvey";
import UserResponses from "./pages/user/UserResponses";
import { useState, useEffect } from "react";
import Notification from "./components/Notification";
function App() {
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = (event) => {
      setNotification(event.detail);
      setTimeout(() => {
        window.location = "/login";
      }, 3000);
    };

    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, [navigate]);

  const handleNotificationClose = () => {
    setNotification("");
    window.location = "/login";
  };
  return (
    <AuthProvider>
      <NavBar />
      <Layout>
        <Notification
          message={notification}
          onClose={handleNotificationClose}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/survey/:surveyId/respond"
            element={<SurveyResponseForm />}
          />
          <Route path="/survey/:surveyId/details" element={<SurveyDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          >
            <Route path="create-survey" element={<CreateSurvey />} />
            <Route path="surveys" element={<UserSurveys />} />
            <Route
              path="surveys/:surveyId/analysis"
              element={<SurveyResponseAnalysis />}
            />
            <Route path="surveys/:surveyId/manage" element={<ManageSurvey />} />
            <Route path="active-surveys" element={<ActiveSurveys />} />
            <Route path="responses" element={<UserResponses />} />
          </Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
