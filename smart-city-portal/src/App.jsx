import React, { Suspense, lazy, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import ComplaintProvider from "./context/ComplaintContext";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ComplaintForm = lazy(() => import("./pages/ComplaintForm"));
const ComplaintDetails = lazy(() => import("./pages/ComplaintDetails"));

// ProtectedRoute component for routes that require login (and optionally admin role)
// ProtectedRoute component for routes that require login (and optionally admin role)
const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await axios.get("/api/health", {
          withCredentials: true,
          timeout: 3000,
        });
      } catch (err) {
        console.error("Backend connection failed:", err);
      }
    };
    checkBackend();
  }, []);

  // While the AuthContext is loading, render a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // Once loading is complete, if there's no authenticated user, redirect to /auth
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  // If the route is admin-only and the user is not an admin, redirect to /dashboard
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

// Providers wrapper for context
const Providers = ({ children }) => (
  <AuthProvider>
    <ComplaintProvider>{children}</ComplaintProvider>
  </AuthProvider>
);

// HomeWrapper to scroll to top (and optionally handle redirection)
const HomeWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Uncomment the following if you want to automatically redirect admins from Home:
    // if (user?.role === "admin" && location.pathname === "/") {
    //   navigate("/admindashboard");
    // }
  }, [location.pathname, user, navigate]);

  return <Home />;
};

function App() {
  return (
    <Router>
      <Providers>
        <Navbar />
        
        <div className="main-content">
          <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomeWrapper />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected User Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/report" element={
                <ProtectedRoute>
                  <ComplaintForm />
                </ProtectedRoute>
              } />
              <Route path="/complaints" element={
                <ProtectedRoute>
                  <ComplaintDetails />
                </ProtectedRoute>
              } />

              {/* Admin-Only Routes */}
              <Route path="/admindashboard" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </Providers>
    </Router>
  );
}

export default App;
