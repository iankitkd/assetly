import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5", // Indigo
    },
    secondary: {
      main: "#6366F1", // Soft accent
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
});

export default theme;
