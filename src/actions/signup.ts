"use server"

import { signIn } from "@/auth";
import { createUser, getUserByEmail } from "@/actions/user";
import { signupSchema, SignupValues } from "@/lib/validators";
import { hashPassword } from "@/lib/password";

export const signup = async (values: SignupValues) => {
  try {
    const validatedFields = signupSchema.safeParse(values);

    if (!validatedFields.success) {
      return { success: false, message: "Invalid fields!" };
    }

    const { name, email, password, role } = validatedFields.data;

    const user = await getUserByEmail(email);
    if (user) {
      return { success: false, message: "User already exist!" };
    }

    const hashedPassword = await hashPassword(password);

    await createUser({name, email, password: hashedPassword, role});
    
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true, message: "User created successfully!" };

  } catch (error) {
    return { success: false, message: "Something went wrong", error: error };
  }
};
