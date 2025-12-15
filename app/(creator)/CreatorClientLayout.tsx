"use client";

import Sidebar from "@/components/creator/Sidebar";
import Topbar from "@/components/creator/Topbar";

export default function CreatorClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
