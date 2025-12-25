"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AuthFormWrapper from "@/components/auth/AuthFormWrapper";

import { useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <AuthFormWrapper
      label="Welcome back"
      desciption="Sign in to manage, sell, and discover digital assets"
      showSocials={true}
      backButtonLabel="Sign up"
      backButtonDescription="Don't have an account?"
      backButtonHref="/signup"
    >
      {/* Email Password Form */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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


        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 1,
          }}
        >
          <MuiLink
            component={Link}
            href="/forgot-password"
            variant="body2"
            underline="hover"
          >
            Forgot password?
          </MuiLink>
        </Box>

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
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </Box>
    </AuthFormWrapper>
  );
}
