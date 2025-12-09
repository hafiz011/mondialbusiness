// app/admin/page.tsx

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
          <p className="text-gray-600 mb-4">View, approve, or reject submitted projects.</p>
          <Link href="/admin/projects" className="text-blue-600 hover:underline">
            Go to Projects →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Manage Users</h2>
          <p className="text-gray-600 mb-4">View and manage user accounts.</p>
          <Link href="/admin/users" className="text-blue-600 hover:underline">
            Go to Users →
          </Link>
        </div>
      </div>
    </div>
  );
}