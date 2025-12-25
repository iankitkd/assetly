import SignupForm from "@/components/auth/SignupForm";
import { Box } from "@mui/material";

export default function page() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
      }}
    >
      <SignupForm />
    </Box>
  );
}
