import { Suspense } from "react";
import SignupForm from "@/components/auth/SignupForm";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
