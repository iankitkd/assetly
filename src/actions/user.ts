"use server"

import { prisma } from "@/lib/prisma";
import { SignupValues } from "@/lib/validators";

export const createUser = async ({name, email, password}: SignupValues) => {
  const user = await prisma.user.create({data: {
    name,
    email,
    password,
  }});
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({where: { email },});
  return user;
};