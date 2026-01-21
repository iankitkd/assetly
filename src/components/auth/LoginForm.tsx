"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityIcon, VisibilityOffIcon } from "@/components/icons";

import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import FormSuccess from "@/components/shared/FormSuccess";
import FormError from "@/components/shared/FormError";

import { useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@/actions/login";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params?.get('callbackUrl');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandler = async (values: LoginValues) => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const res = await login(values);
      if(res.success) {
        setSuccess(res.message);
        router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("Something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper
      label="Welcome back"
      desciption="Sign in to manage, sell, and discover digital assets"
      showSocials={true}
      backButtonLabel="Sign up"
      backButtonDescription="Don't have an account?"
      backButtonHref={callbackUrl ? `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}` : `/signup`}
      dataTestid="login-page"
    >
      {/* Email Password Form */}
      <Box component="form" onSubmit={handleSubmit(loginHandler)}>
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
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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

        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}

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
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </Box>
    </AuthFormWrapper>
  );
}
