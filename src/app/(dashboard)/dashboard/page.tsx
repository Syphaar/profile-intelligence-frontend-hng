"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthRole } from "../../hooks/useAuthRole";
import type { Profile } from "../../types";

export default function DashboardPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const role = useAuthRole();

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setError("");

      const response = await api(
        `/profiles?page=${currentPage}&limit=10`
      );

      if (!response || response.error) {
        setError("Failed to load profiles");
        setLoading(false);
        return;
      }

      setProfiles(response.data || []);

      // const totalRecords = response.total ?? 0;
      const totalRecords =
        response.total ||
        response.totalCount ||
        response?.pagination?.total ||
        response?.meta?.total ||
        0;
      const pageSize = 10;

      setTotalPages(Math.max(1, Math.ceil(totalRecords / pageSize)));

      setLoading(false);
    };

    fetchProfiles();
  }, [currentPage]);

  if (loading) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  // METRICS (CURRENT PAGE)
  const profilesOnPage = profiles.length;

  const activeUsersOnPage = profiles.filter(
    (profile) => profile.age >= 18
  ).length;

  const uniqueCountriesOnPage = new Set(
    profiles.map((profile) => profile.country_name)
  ).size;

  const systemStatus =
    profilesOnPage > 0 ? "Operational" : "No Data Available";

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Insighta Labs Dashboard
        </h1>
      </div>

      {/* ROLE */}
      <div className="text-sm text-gray-600">
        Role: <b>{role}</b>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">
            Profiles on Page
          </div>
          <div className="text-2xl font-bold">
            {profilesOnPage}
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">
            Active Users (18+)
          </div>
          <div className="text-2xl font-bold">
            {activeUsersOnPage}
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">
            Countries on Page
          </div>
          <div className="text-2xl font-bold">
            {uniqueCountriesOnPage}
          </div>
        </div>

      </div>

      {/* SYSTEM STATUS */}
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">
          System Status
        </div>
        <div className="text-xl font-semibold">
          {systemStatus}
        </div>
      </div>

      {/* PROFILE LIST */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">Profiles</h2>

        {profiles.map((profile) => (
          <div key={profile.id} className="border-b py-4 text-sm space-y-2">
            {/* PROFILE NAME HEADER */}
            <div className="font-semibold text-base">
              {profile.name || "Unnamed Profile"}
            </div>

            {/* FULL PROFILE DETAILS (EXCLUDING ID) */}
            <div className="grid md:grid-cols-2 gap-2 text-gray-700">
              {Object.entries(profile)
                .filter(([key]) => key !== "id")
                .map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <span className="font-medium capitalize">
                      {key.replaceAll("_", " ")}:
                    </span>
                    <span className="text-gray-600">
                      {value !== null && value !== undefined
                        ? String(value)
                        : "N/A"}
                    </span>
                  </div>
                ))}

            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 items-center">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="text-sm">
          Page {currentPage} of {totalPages}
        </div>

        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}