import { Suspense } from "react";
import { Box } from "@mui/material";
import SignupForm from "@/components/auth/SignupForm";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}
