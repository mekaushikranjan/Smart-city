import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ComplaintProvider from "./context/ComplaintContext";
import { ThemeProviderComponent } from "./context/ThemeContext";
import axios from "axios";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login")); // Although imported, not used if using combined Auth
const Register = lazy(() => import("./pages/Register"));
const Navbar = lazy(() => import("./components/Navbar"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ComplaintForm = lazy(() => import("./pages/ComplaintForm"));
const ComplaintDetails = lazy(() => import("./pages/ComplaintDetails"));
const Auth = lazy(() => import("./pages/Auth")); // Combined auth component

// Loading component for better user experience
const LoadingSpinner = () => (
  <div className="loading-spinner">Loading...</div>
);

// ProtectedRoute component for authentication checks
const ProtectedRoute = ({ children, adminOnly }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser) {
      try {
        // Ensure storedUser is valid JSON
        if (storedUser !== "undefined" && storedUser !== null) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // If you're using axios globally, set the auth header
          if (storedToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          }
        }
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
};

// NavbarWrapper to handle Navbar loading separately
const NavbarWrapper = () => {
  return (
    <Suspense fallback={<div style={{ height: "60px" }}></div>}>
      <Navbar />
    </Suspense>
  );
};

function App() {
  return (
    <ThemeProviderComponent>
      <ComplaintProvider>
        <Router>
          <NavbarWrapper />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/report"
                element={
                  <ProtectedRoute>
                    <ComplaintForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/complaints"
                element={
                  <ProtectedRoute>
                    <ComplaintDetails />
                  </ProtectedRoute>
                }
              />

              {/* Admin-Only Routes */}
              <Route
                path="/admindashboard"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </ComplaintProvider>
    </ThemeProviderComponent>
  );
}

export default App;
