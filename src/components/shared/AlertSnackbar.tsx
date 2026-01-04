import { Alert, Snackbar } from "@mui/material";

interface AlertSnackbarProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  success?: boolean;
  message?: string;
}

export default function AlertSnackbar({
  open,
  setOpen,
  success,
  message,
}: AlertSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={success ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
