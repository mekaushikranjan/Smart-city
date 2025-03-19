import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ComplaintProvider from "./context/ComplaintContext";
import { ThemeProviderComponent } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProviderComponent>
    <AuthProvider> {/* Wrap with AuthProvider */}
      <ComplaintProvider>
        <App />
      </ComplaintProvider>
    </AuthProvider>
  </ThemeProviderComponent>
);
