"use client";

import { useEffect, useState } from "react";
// import DashboardLayout from "../layout";
import { api } from "@/lib/api";
import type { Profile } from "@/app/types";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [ageGroup, setAgeGroup] = useState("");

  // Fetch profiles with current filters
  useEffect(() => {
  const fetchProfiles = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");

      // if (search.trim()) params.set("q", search.trim());
      let endpoint = "";

      if (search.trim()) {
        endpoint = `/profiles/search?q=${encodeURIComponent(search)}&page=${page}&limit=10`;
      } else {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("limit", "10");

        if (gender) params.set("gender", gender);
        // if (country) params.set("country_id", country);
        if (country) {
          params.set("country_id", country);       // NG
          params.set("country_name", country);     // Nigeria
        }
        if (ageGroup) params.set("age_group", ageGroup);

        endpoint = `/profiles?${params.toString()}`;
      }

      // const data = await api(endpoint);
      const data = await api(endpoint, {
        credentials: "include",
        headers: {
          "X-API-Version": "1"
        }
      });

      if (data?.error) {
        setError(data.error);
        setProfiles([]);
      } else {
        setProfiles(data?.data || []);
        setTotal(data?.total || 0);
        setTotalPages(Math.ceil((data?.total || 0) / 10));
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  };

  fetchProfiles();
}, [page, search, gender, country, ageGroup]);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    // <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profiles</h1>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-4 rounded shadow space-y-4">
          <h3 className="font-semibold">Filters</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleFilterChange();
              }}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* GENDER */}
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                handleFilterChange();
              }}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* COUNTRY */}
            <input
              type="text"
              placeholder="Filter by country (e.g., NG, US)..."
              value={country}
              onChange={(e) => {
                setCountry(e.target.value.toUpperCase());
                handleFilterChange();
              }}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* AGE GROUP */}
            <select
              value={ageGroup}
              onChange={(e) => {
                setAgeGroup(e.target.value);
                handleFilterChange();
              }}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Age Groups</option>
              <option value="child">Child</option>
              <option value="adolescent">Adolescent</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          {/* CLEAR FILTERS */}
          {(search || gender || country || ageGroup) && (
            <button
              onClick={() => {
                setSearch("");
                setGender("");
                setCountry("");
                setAgeGroup("");
                setPage(1);
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded text-red-700">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-gray-500">Loading profiles...</p>
          </div>
        )}

        {/* RESULTS SUMMARY */}
        {!loading && profiles.length > 0 && (
          <div className="text-sm text-gray-600">
            Found {total} profile{total !== 1 ? "s" : ""}
            {search && ` matching "${search}"`}
          </div>
        )}

        {/* NO RESULTS */}
        {!loading && profiles.length === 0 && !error && (
          <div className="bg-white p-8 rounded shadow text-center">
            <p className="text-gray-500">No profiles found with current filters</p>
          </div>
        )}

        {/* PROFILES GRID */}
        {!loading && profiles.length > 0 && (
          <>
            <div className="grid gap-4">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{profile.name}</h3>
                      <p className="text-sm text-gray-600">
                        {profile.country_name} • {profile.age_group}
                      </p>
                    </div>
                    <a
                      href={`/profiles/${profile.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-4"
                    >
                      View Details →
                    </a>
                  </div>

                  {/* DETAILS */}
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <p className="font-medium capitalize">{profile.gender}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Age:</span>
                      <p className="font-medium">{profile.age}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Country:</span>
                      <p className="font-medium">{profile.country_id}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">ID:</span>
                      <p className="font-medium text-gray-600">
                        {profile.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded transition-colors ${
                          pageNum === page
                            ? "bg-blue-600 text-white"
                            : "bg-white border hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}

            {/* PAGE INFO */}
            <div className="text-center text-sm text-gray-500">
              Page {page} of {totalPages}
            </div>
          </>
        )}
      </div>
    // </DashboardLayout>
  );
}
