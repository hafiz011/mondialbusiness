"use client";

import { InvestorSidebar } from "@/components/investor/investor-sidebar";
import { DashboardHeader } from "@/components/creator/dashboard-header";

export default function InvestorClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <InvestorSidebar />
      <div className="flex-1">
              <DashboardHeader title="Dashboard" description="Welcome back, Sarah! Here's your portfolio overview." />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
