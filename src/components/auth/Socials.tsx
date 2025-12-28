import { Box, Button, Divider } from "@mui/material";
import { GoogleIcon } from '@/components/icons';

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Socials() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

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
        onClick={() => handleClick("google")}
      >
        Continue with Google
      </Button>

    </Box>
  );
}
