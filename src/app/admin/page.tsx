"use client";

import DashboardLayout from "@/app/(dashboard)/layout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <h1 className="text-xl font-bold">Admin Panel</h1>

        <div className="bg-white p-4 mt-4 rounded shadow">
          Admin tools will appear here
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}