"use client";

import StatCard from "@/components/creator/StatCard";
import DashboardChart from "@/components/creator/DashboardChart";
import RecentActivity from "@/components/creator/RecentActivity";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Ideas" value="3" />
        <StatCard title="Fund Raised" value="$150,000" />
        <StatCard title="Active Investors" value="12" />
        <StatCard title="Wallet Balance" value="$50,000" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardChart />
        <RecentActivity />
      </div>
    </>
  );
}
