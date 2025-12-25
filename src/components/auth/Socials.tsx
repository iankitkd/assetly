import { Box, Button, Divider } from "@mui/material";
import { GoogleIcon } from '@/components/icons';

import { signIn } from "next-auth/react";

export default function Socials() {
  return (
    <Box>
      <Divider sx={{ my: 2 }}>or</Divider>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        sx={{
          textTransform: "none",
          mb: 2,
        }}
        onClick={() => signIn("google")}
      >
        Continue with Google
      </Button>

    </Box>
  );
}
