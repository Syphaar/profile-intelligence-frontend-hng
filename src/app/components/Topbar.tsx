"use client";

import LogoutButton from "./LogoutButton";
import { useAuthRole } from "../hooks/useAuthRole";

export default function Topbar({ setMobileOpen }: any) {
  const role = useAuthRole();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      
      <button
        className="md:hidden text-xl"
        onClick={() => setMobileOpen(true)}
      >
        ☰
      </button>

      <h2 className="font-semibold hidden md:block">Dashboard</h2>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 hidden md:block">
          Role: {role}
        </span>
        <LogoutButton />
      </div>
    </header>
  );
}