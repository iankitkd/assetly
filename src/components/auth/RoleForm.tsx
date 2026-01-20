"use client";

import { useState } from "react";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import { roles } from "@/data";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Grid,
  Typography,
} from "@mui/material";
import { RoleType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { updateUserRole } from "@/actions/user";

export default function RoleForm() {
  const [role, setRole] = useState<RoleType>("USER");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params?.get("callbackUrl");

  const roleHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUserRole(role);
      router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper
      label="Select your role"
      desciption="Choose how you want to use Assetly"
      showSocials={false}
    >
      <Box component="form" onSubmit={roleHandler}>
        {/* Role selection */}
        <Grid container spacing={2} mb={1}>
          {roles.map((item) => (
            <Grid size={{ xs: 6 }} key={item.id}>
              <Card
                variant="outlined"
                sx={{
                  borderColor: role === item.id ? "primary.main" : "divider",
                  bgcolor: role === item.id ? "primary.light" : "background.paper",
                }}
              >
                <CardActionArea onClick={() => setRole(item.id as RoleType)}>
                  <Box p={2} textAlign="center">
                    <Typography fontWeight={600}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{
            mt: 3,
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </Box>
    </AuthFormWrapper>
  );
}