import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  const [themeMode, setThemeMode] = useState("dark");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: themeMode === "dark" ? "dark" : "light",
        primary: { main: themeMode === "dark" ? "#2196f3" : "#041122" },
        background: {
          default: themeMode === "dark" ? "#121212" : "#041122",
          paper: themeMode === "dark" ? "#1e1e1e" : "#041122",
        },
        text: { 
          primary: themeMode === "dark" ? "#ffffff" : "#0d47a1"
        },
      },
    }), 
  [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
