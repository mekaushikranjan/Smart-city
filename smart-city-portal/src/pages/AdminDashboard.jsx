import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/adminDashboard.css";  // Correct case

const AdminDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!user) {
        setError("You must be logged in to view complaints.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/complaints", {
          withCredentials: true
        });
        setComplaints(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          window.location.href = "/login";
        } else {
          setError("Error fetching complaints.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) fetchComplaints();
  }, [user, authLoading]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setComplaints(complaints.map(complaint => 
        complaint._id === id ? { ...complaint, status: newStatus } : complaint
      ));
      setSuccessMessage("Status updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to update status");
    }
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admindashboard">
      <h1>Admin Dashboard</h1>
      <h2>Manage Complaints</h2>
      
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Title</th>
              <th>User</th>
              <th>Description</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>#{complaint._id.slice(-6)}</td>
                <td>{complaint.title}</td>
                <td>{complaint.user?.name || "Unknown User"}</td>
                <td>{complaint.description}</td>
                <td>{complaint.category}</td>
                <td>
                  <select 
                    value={complaint.status} 
                    onChange={(e) => handleStatusUpdate(complaint._id, e.target.value)}
                    className={`status-select ${complaint.status.toLowerCase()}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="update-btn"
                    onClick={() => handleStatusUpdate(complaint._id, complaint.status)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;