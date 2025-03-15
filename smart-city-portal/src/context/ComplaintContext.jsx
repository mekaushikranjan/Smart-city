import { createContext, useState } from "react";

export const ComplaintContext = createContext();

const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]); // Stores complaints

  const addComplaint = (newComplaint) => {
    const complaintWithId = {
      ...newComplaint,
      id: complaints.length + 1,
      status: "Pending", // 🟡 Default status
    };
    setComplaints([...complaints, complaintWithId]); // Update state
  };

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint }}>
      {children}
    </ComplaintContext.Provider>
  );
};

export default ComplaintProvider;
