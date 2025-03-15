import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ComplaintForm from "./ComplaintForm";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Remove automatic redirection for admin users.
  // Admins will see the dashboard with an Admin Panel that includes a link to /admindashboard.
  
  if (!user) return <h2>Please log in to access the dashboard.</h2>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {user.name}!</h1>

      {user.role === "admin" ? (
        // Admin Panel: Display admin-specific information and a link to the admin dashboard.
        <div className="dashboard-panel admin-panel">
          <h2>Admin Panel</h2>
          <p>You're logged in as an admin.</p>
  
        </div>
      ) : (
        // User Panel: Display user information and a button to file a complaint.
        <div className="dashboard-panel user-panel">
          <h2>Welcome, {user.email}</h2>
          <h2>Complaints:</h2>
          {/* If you have complaints to display, you can render them here */}
          <button
            className="dashboard-button user-btn"
            onClick={() => setShowForm(true)}
          >
            File Complaint
          </button>
        </div>
      )}

      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setShowForm(false)}>
              X
            </button>
            <ComplaintForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;








