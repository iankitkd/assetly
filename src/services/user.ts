import { prisma } from "@/lib/prisma";
import { SignupValues } from "@/lib/validators";

export const createUser = async ({name, email, password, role}: SignupValues) => {
  const user = await prisma.user.create({data: {
    name,
    email,
    password,
    role,
  }});
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({where: { email },});
  return user;
};