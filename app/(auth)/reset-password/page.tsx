import { Suspense } from "react";
import ResetPassword from "@/components/auth/confirm-email/ConfirmEmailContent";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
