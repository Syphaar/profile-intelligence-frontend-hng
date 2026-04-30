"use client";

import Link from "next/link";
import { useAuthRole } from "../hooks/useAuthRole";

export default function Sidebar({ mobileOpen, setMobileOpen }: any) {
  const role = useAuthRole();

  return (
    <div
      className={`fixed md:static z-50 bg-black text-white w-64 p-5 space-y-4 
      h-full transition-transform duration-300
      ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Insighta Labs+</h1>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col gap-3 mt-6 text-sm">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/profiles">Profiles</Link>

        {role === "admin" && (
          <>
            <Link href="/admin">Admin</Link>
            <Link href="/logs">Logs</Link>
          </>
        )}

        <Link href="/settings">Settings</Link>
      </nav>
    </div>
  );
}