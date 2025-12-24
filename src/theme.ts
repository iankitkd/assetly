import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5", // Indigo
    },
    secondary: {
      main: "#F59E0B", // Amber
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  },

  shape: {
    borderRadius: 8,
  },
});

export default theme;
