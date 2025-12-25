"use client";

import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

interface AuthErrorAlertProps {
  error: string | null;
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function ErrorAlert({
  error,
  onRetry,
  showRetry = true,
}: AuthErrorAlertProps) {
  const router = useRouter();

  if (!error) return null;

  return (
    <Alert 
      severity="error" 
      sx={{ 
        width: "100%",
        minWidth: 360,
        maxWidth: 420,
        p: 4,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <AlertTitle>Sign in failed</AlertTitle>

      <Stack spacing={2}>
        <span>{error}</span>

        {showRetry && (
          <Stack direction="row" spacing={2}>
            <Button
              // size="small"
              variant="outlined"
              onClick={onRetry ?? (() => router.refresh())}
            >
              Try again
            </Button>

            <Button
              // size="small"
              variant="contained"
              onClick={() => router.push("/home")}
            >
              Go home
            </Button>
          </Stack>
        )}
      </Stack>
    </Alert>
  );
}
