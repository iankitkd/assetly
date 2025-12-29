import { auth } from "@/auth";
import RoleForm from "@/components/auth/RoleForm";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page() {
  const session = await auth();
  const user = session?.user;

  if(user?.role) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoleForm />
    </Suspense>
  )
}
