"use server"

import { signIn } from "@/auth";
import { loginSchema, LoginValues } from "@/lib/validators";
import { AuthError } from "next-auth";
import * as Sentry from "@sentry/nextjs";

export const login = async (values: LoginValues) => {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { success: false, message: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true, message: "Signed in successfully!" };

  } catch (error) {
    if (!(error instanceof AuthError)) {
      Sentry.captureException(error, {
        tags: { feature: "auth" },
      });
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials!" };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    return { success: false, message: "Something went wrong" };
  }
};
