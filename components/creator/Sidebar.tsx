"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Lightbulb,
  PlusCircle,
  Users,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  { title: "Dashboard", href: "/creator-dashboard", icon: LayoutDashboard },
  { title: "My Ideas", href: "/my-ideas", icon: Lightbulb },
  { title: "Create Idea", href: "/create-idea", icon: PlusCircle },
  { title: "Investors", href: "/funding-investors", icon: Users },
  { title: "Wallet & Transactions", href: "/wallet-transactions", icon: Wallet },
  { title: "Profile", href: "/profile", icon: Settings },
    { title: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Mondial.eco</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menu.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm
                ${
                  active
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button className="flex gap-2 text-red-600 text-sm">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}




