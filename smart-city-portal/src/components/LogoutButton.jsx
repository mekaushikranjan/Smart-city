import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await API.post("/auth/logout");
    logout(); // Clear user session
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
