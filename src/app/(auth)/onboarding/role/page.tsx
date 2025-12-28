import { auth } from "@/auth";
import RoleForm from "@/components/auth/RoleForm";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Box } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
        }}
      >
        <RoleForm />
      </Box>
    </Suspense>
  )
}
