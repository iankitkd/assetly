"use server"

import { auth, unstable_update } from "@/auth";
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


export const updateUserRole = async (role: "USER" | "SELLER") => {
  const session = await auth();  
  
  if (!session?.user?.id) throw new Error("Unauthorized");

  // update db
  await prisma.user.update({
    where: { id: session.user.id },
    data: { role },
  });

  // update token and session
  await unstable_update({
    user: {
      ...session?.user,
      role: "USER",
    },
  });
}
