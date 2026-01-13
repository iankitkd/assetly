"use client";

import { UserType } from "@/types";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserCard({ user }: { user: UserType }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signoutHandler = async () => {
    try {
      setLoading(true);
      await signOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 420,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Stack spacing={2} direction="row" alignContent="center">
            {/* Avatar */}

            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: 32,
                bgcolor: "primary.main",
              }}
            >
              {user.name.charAt(0)}
            </Avatar>

            {/* User Info */}
            <Stack spacing={0.5} alignItems="right">
              <Typography variant="h6" fontWeight={600}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Chip
                variant="filled"
                label={user.role}
                size="small"
                sx={{ p: 1, width: "fit-content" }}
              />
            </Stack>
          </Stack>

          <Divider flexItem />

          {/* Sign out */}
          <Button
            variant="outlined"
            color="error"
            // fullWidth
            size="large"
            sx={{ width: "fit-content", alignSelf: "center" }}
            loading={loading}
            onClick={() => signoutHandler()}
          >
            Sign out
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
