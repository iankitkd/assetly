import Link from "next/link";

import { Paper, Typography, Link as MuiLink } from "@mui/material";
import Socials from "@/components/auth/Socials";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  showSocials?: boolean;
  label: string;
  desciption?: string;
  backButtonLabel?: string;
  backButtonDescription?: string;
  backButtonHref?: string;
}

export default function AuthFormWrapper({
  children,
  label,
  desciption,
  backButtonLabel,
  backButtonDescription,
  backButtonHref,
  showSocials = false,
}: AuthFormWrapperProps) {
  return (
    <Paper
      elevation={1}
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
      {/* title */}
      <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
        {label}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        mb={3}
      >
        {desciption}
      </Typography>

      {/* children */}
      {children}

      {/* socials */}
      {showSocials && <Socials />}

      {/* footer */}
      {backButtonHref && (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={1}
        >
          {backButtonDescription + " "}
          <MuiLink
            component={Link}
            href={backButtonHref}
            underline="hover"
            fontWeight={500}
          >
            {backButtonLabel}
          </MuiLink>
        </Typography>
      )}
    </Paper>
  );
}
