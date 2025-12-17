"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginApi } from "@/service/auth";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { token, user } = await loginApi(email, password);
      login(token, user);

      if (user.roles.includes("Admin")) {
        router.push("/admin");
        return;
      }
      if (user.roles.includes("Investor")) {
        router.push("/investors");
        return;
      }
      if (user.roles.includes("Creator")) {
            router.push("/creator-dashboard");
            return;
          }
      router.push("/my-profile");
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Log In
      </h1>

      {errorMsg && (
        <p className="text-red-600 text-center mb-3">{errorMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-cyan outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-cyan outline-none"
          />
        </div>

        <Button type="submit" className="w-full mt-4" size="lg" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?
        <Link href="/signup" className="text-brand-cyan hover:underline font-medium"> Sign up free</Link>
      </div>
      <div className="mt-6 text-center text-sm text-gray-600">
        <a href="/forgot-password">Forgot password?</a>
      </div>
    </>
  );
}
