import { ErrorOutline } from "@/components/icons";
import { Box, Typography } from "@mui/material";

interface FormErrorProps {
  message: string;
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1.25,
        my: 1,
        borderRadius: 1,
        backgroundColor: (theme) => theme.palette.error.light + "33", // soft error bg
        color: "error.main",
      }}
    >
      <ErrorOutline
        fontSize="small"
        sx={{ color: "error.main" }}
      />

      <Typography variant="body2" fontWeight={500}>
        {message}
      </Typography>
    </Box>
  );
};

export default FormError;
