import { CheckCircleOutline } from "@/components/icons";
import { Box, Typography } from "@mui/material";

interface FormSuccessProps {
  message: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
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
        backgroundColor: (theme) => theme.palette.success.light + "33",
        color: "success.main",
      }}
    >
      <CheckCircleOutline
        fontSize="small"
        sx={{ color: "success.main" }}
      />

      <Typography variant="body2" fontWeight={500}>
        {message}
      </Typography>
    </Box>
  );
};

export default FormSuccess;