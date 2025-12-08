"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { confirmEmailApi } from "@/service/auth";

export default function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      if (!userId || !token) {
        setStatus("error");
        setMessage("Invalid confirmation link.");
        return;
      }

      try {
        const response = await confirmEmailApi({
          UserId: userId,
          Token: token,
        });

        setStatus("success");
        setMessage(response.message || "Email confirmed successfully!");
      } catch (err: any) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Email confirmation failed.");
      }
    };

    confirmEmail();
  }, [userId, token]);

  return (
    <div className="p-6 text-center">
      {status === "loading" && <p>Confirming your email...</p>}
      {status === "success" && <p className="text-green-600">{message}</p>}
      {status === "error" && <p className="text-red-600">{message}</p>}
    </div>
  );
}
