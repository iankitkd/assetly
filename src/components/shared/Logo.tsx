import { LayersOutlinedIcon } from "@/components/icons";
import { APP_NAME } from "@/data";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Logo() {
  return (
    <Box
      component={Link}
      href="/discover"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        color: "primary.main",
        textDecoration: "none",
      }}
    >
      <LayersOutlinedIcon sx={{ fontSize: 30 }} />
      <Typography variant="h1" fontWeight={900} sx={{ typography: { xs: "h5", md: "h4" } }}>
        {APP_NAME}
      </Typography>
    </Box>
  );
}
