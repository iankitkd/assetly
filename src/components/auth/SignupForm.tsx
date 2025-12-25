"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Card,
  CardActionArea,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AuthFormWrapper from "@/components/auth/AuthFormWrapper";

import { useForm } from "react-hook-form";
import { signupSchema, SignupValues } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import { roles } from "@/data";

type Role = "user" | "seller";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("user");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupValues) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <AuthFormWrapper
      label="Create your account"
      desciption="Start selling and discovering digital assets"
      showSocials={true}
      backButtonLabel="Sign in"
      backButtonDescription="Already have an account?"
      backButtonHref="/login"
    >
      {/* Email Password Form */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Role selection */}
        <Grid container spacing={2} mb={1}>
          {roles.map((item) => (
            <Grid size= {{xs: 6}} key={item.id}>
              <Card
                variant="outlined"
                sx={{
                  borderColor: role === item.id ? 'primary.main' : 'divider',
                  bgcolor: role === item.id ? 'primary.light' : 'background.paper',
                }}
              >
                <CardActionArea onClick={() => setRole(item.id as Role)}>
                  <Box p={2} textAlign="center">
                    <Typography fontWeight={600}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <TextField
          variant="standard"
          label="Name"
          fullWidth
          autoComplete="name"
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name")}
        />
        
        <TextField
          variant="standard"
          label="Email"
          type="email"
          fullWidth
          // required
          autoComplete="email"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />

        <TextField
          variant="standard"
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          // required
          autoComplete="current-password"
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{
            mt: 3,
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          {isSubmitting ? "Registering..." : `Register as ${role === 'user' ? 'user' : 'Seller'}`}
        </Button>
      </Box>
    </AuthFormWrapper>
  );
}
