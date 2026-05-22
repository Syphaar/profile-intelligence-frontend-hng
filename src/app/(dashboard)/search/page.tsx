"use client";

import { useState } from "react";
// import DashboardLayout from "../layout";
import { api } from "@/lib/api";
import type { Profile } from "@/app/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Profile[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Perform search
  const performSearch = async (searchQuery: string, pageNum: number) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotal(0);
      setTotalPages(1);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const endpoint = `/profiles/search?q=${encodeURIComponent(searchQuery)}&page=${pageNum}&limit=10`;
      const data = await api(endpoint);

      if (data?.error) {
        setError(data.error);
        setResults([]);
        setTotalPages(1);
        setTotal(0);
      } else {
        setResults(data?.data || []);
        setTotal(data?.total || 0);
        setTotalPages(Math.ceil((data?.total || 0) / 10));
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search profiles");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    performSearch(newQuery, 1);
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    performSearch(query, newPage);
  };

  return (
    // <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Search Profiles</h1>
        </div>

        {/* SEARCH BOX */}
        <div className="bg-white p-4 rounded shadow">
          <input
            type="text"
            placeholder="Search for people by name or details..."
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-2">
            Tip: Try searching for specific names, countries, or characteristics
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded text-red-700">
            {error}
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-gray-500">Searching...</p>
          </div>
        )}

        {/* NO QUERY STATE */}
        {!query && !loading && (
          <div className="bg-white p-8 rounded shadow text-center">
            <p className="text-gray-500">Enter a search query to find profiles</p>
          </div>
        )}

        {/* RESULTS SUMMARY */}
        {!loading && results.length > 0 && (
          <div className="text-sm text-gray-600">
            Found {total} profile{total !== 1 ? "s" : ""} matching{" "}
            <span className="font-medium">`{query}`</span>
          </div>
        )}

        {/* NO RESULTS */}
        {!loading && query && results.length === 0 && !error && (
          <div className="bg-white p-8 rounded shadow text-center">
            <p className="text-gray-500">
              No profiles found matching <span className="font-medium">`{query}`</span>
            </p>
          </div>
        )}

        {/* PROFILES GRID */}
        {!loading && results.length > 0 && (
          <>
            <div className="grid gap-4">
              {results.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{profile.name}</h3>
                      <p className="text-sm text-gray-600">
                        {profile.country_name} • {profile.age_group}
                      </p>
                    </div>
                    <a href={`/profiles/${profile.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details →
                    </a>
                  </div>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <p className="font-medium">{profile.gender}</p>
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
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}
                  className="px-4 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {(() => {
                    const pagesToShow = new Set<number>();
                    // Always show first page
                    pagesToShow.add(1);
                    // Show pages around current page (±2)
                    for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
                      pagesToShow.add(i);
                    }
                    // Always show last page
                    if (totalPages > 1) {
                      pagesToShow.add(totalPages);
                    }

                    const sorted = Array.from(pagesToShow).sort((a, b) => a - b);
                    const result: (number | string)[] = [];
                    for (let i = 0; i < sorted.length; i++) {
                      if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
                        result.push('...');
                      }
                      result.push(sorted[i]);
                    }

                    return result.map((item, idx) => {
                      if (item === '...') {
                        return <span key={`ellipsis-${idx}`} className="px-2 py-1 text-gray-500">...</span>;
                      }
                      return (
                        <button key={item} onClick={() => handlePageChange(item as number)}
                          className={`px-3 py-2 rounded transition-colors ${
                            item === page
                              ? "bg-blue-600 text-white"
                              : "bg-white border hover:bg-gray-50"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    });
                  })()}
                </div>

                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}
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
