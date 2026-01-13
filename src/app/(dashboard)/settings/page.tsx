import { auth } from "@/auth";
import UserCard from "@/components/dashboard/UserCard";
import { UserType } from "@/types";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user?.name) {
    redirect("/login");
  }

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <UserCard user={user as UserType} />
    </Box>
  );
}
