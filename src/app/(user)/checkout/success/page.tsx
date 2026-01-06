import { Box, Typography } from "@mui/material";

export default function page() {
  return (
    <Box py={6} textAlign="center">
      <Typography variant="h4" fontWeight={600}>
        Payment Successful
      </Typography>
      <Typography>
        Your assets are now available in your library.
      </Typography>
    </Box>
  );
}
