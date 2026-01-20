"use server"

import { auth, unstable_update } from "@/auth";
import { prisma } from "@/lib/prisma";

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
      role,
    },
  });
}