import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/user/LoginPage";
import RegistrationPage from "./components/user/RegistrationPage";
import ProfilePage from "./components/user/ProfilePage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/profile" />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
