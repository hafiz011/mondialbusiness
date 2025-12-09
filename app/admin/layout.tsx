// app/admin/layout.tsx

"use client"; // এটা খুব জরুরি!

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user?.roles?.includes("Admin")) {
        router.push("/login?callbackUrl=" + encodeURIComponent(window.location.pathname));
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  // লোডিং বা অনুমতি না থাকলে কিছু দেখাবে না (ভালো UX এর জন্য)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Checking permissions...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user?.roles?.includes("Admin")) {
    return null; // router.push কাজ করছে, এখানে কিছু দেখানোর দরকার নেই
  }

  return <>{children}</>;
}