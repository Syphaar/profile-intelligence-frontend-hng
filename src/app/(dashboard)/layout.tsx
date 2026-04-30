"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profiles", path: "/profiles" },
    { name: "Search", path: "/search" },
    { name: "Account", path: "/account" },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row">

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Insighta Labs+</h2>

        <nav className="flex md:flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`p-2 rounded ${
                pathname === link.path ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            className="p-2 rounded text-red-300 hover:bg-red-900"
          >
            Logout
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 bg-gray-50">{children}</main>
    </div>
  );
}