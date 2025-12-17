"use client";

import Sidebar from "@/components/creator/Sidebar";
import { DashboardHeader } from "@/components/creator/dashboard-header";

export default function CreatorClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1">
              <DashboardHeader title="Dashboard" description="Welcome back, Sarah! Here's your portfolio overview." />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
