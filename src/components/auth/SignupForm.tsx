"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { VisibilityIcon, VisibilityOffIcon } from "@/components/icons";

import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import FormSuccess from "@/components/shared/FormSuccess";
import FormError from "@/components/shared/FormError";

import { useForm } from "react-hook-form";
import { signupSchema, SignupValues } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";

import { signup } from "@/actions/signup";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { roles } from "@/data";
import { RoleType } from "@/types";

const INITIAL_ROLE = "USER";

export default function SignupForm() {
  const [role, setRole] = useState<RoleType>(INITIAL_ROLE);
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
    setValue,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: INITIAL_ROLE,
    },
  });

  const signupHandler = async (values: SignupValues) => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      values = {...values, role: role};
      const res = await signup(values);
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
      label="Create your account"
      desciption="Start selling and discovering digital assets"
      showSocials={true}
      backButtonLabel="Sign in"
      backButtonDescription="Already have an account?"
      backButtonHref={callbackUrl ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : `/login`}
    >
      {/* Email Password Form */}
      <Box component="form" onSubmit={handleSubmit(signupHandler)} data-testid="signup-form">
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
                <CardActionArea onClick={() => {
                  setRole(item.id as RoleType); 
                  setValue("role", item.id as RoleType);}}
                >
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
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

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
          {isLoading ? "Registering..." : `Register as ${role === 'USER' ? 'user' : 'Seller'}`}
        </Button>
      </Box>
    </AuthFormWrapper>
  );
}
