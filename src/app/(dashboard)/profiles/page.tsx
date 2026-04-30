"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../layout";
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

  // Build query string from filters
  // const buildQuery = (pageNum: number) => {
  //   const params = new URLSearchParams();
  //   params.set("page", pageNum.toString());
  //   params.set("limit", "10");

  //   if (search.trim()) {
  //     params.set("q", search.trim());
  //   }
  //   if (gender) {
  //     params.set("gender", gender);
  //   }
  //   if (country) {
  //     params.set("country", country);
  //   }
  //   if (ageGroup) {
  //     params.set("age_group", ageGroup);
  //   }

  //   return params.toString();
  // };

  // Fetch profiles with current filters
  useEffect(() => {
  const fetchProfiles = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");

      if (search.trim()) params.set("q", search.trim());
      if (gender) params.set("gender", gender);
      if (country) params.set("country", country);
      if (ageGroup) params.set("age_group", ageGroup);

      const endpoint = `/profiles?${params.toString()}`;
      const data = await api(endpoint);

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
    <DashboardLayout>
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
    </DashboardLayout>
  );
}































// "use client";

// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { api } from "@/lib/api";

// export default function ProfilesPage() {
//   const [profiles, setProfiles] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const load = async () => {
//       const endpoint = search
//         ? `/profiles/search?q=${search}&page=${page}&limit=10`
//         : `/profiles?page=${page}&limit=10`;

//       const res = await api(endpoint);
//       setProfiles(res?.data || []);
//     };

//     load();
//   }, [page, search]);

//   return (
//     <ProtectedRoute>
//       <Layout>

//         <input
//           className="border p-2 w-full mb-4"
//           placeholder="Search profiles..."
//           value={search}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//         />

//         <div className="grid gap-3">
//           {profiles.map((p) => (
//             <div
//               key={p.id}
//               className="bg-white p-4 rounded shadow flex justify-between"
//             >
//               <div>
//                 <p className="font-semibold">{p.name}</p>
//                 <p className="text-sm text-gray-500">
//                   {p.country_name}
//                 </p>
//               </div>

//               <a
//                 href={`/profiles/${p.id}`}
//                 className="text-blue-600 text-sm"
//               >
//                 View
//               </a>
//             </div>
//           ))}
//         </div>

//         <div className="flex gap-2 mt-4">
//           <button onClick={() => setPage(page - 1)}>Prev</button>
//           <span>Page {page}</span>
//           <button onClick={() => setPage(page + 1)}>Next</button>
//         </div>

//       </Layout>
//     </ProtectedRoute>
//   );
// }






























// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";
// import Link from "next/link";

// export default function ProfilesPage() {
//   const [profiles, setProfiles] = useState<any[]>([]);

//   useEffect(() => {
//     api("/profiles?page=1&limit=20").then((res) => {
//       if (res?.data) setProfiles(res.data);
//     });
//   }, []);

//   return (
//     <div>
//       <h1 className="text-xl font-bold mb-4">Profiles</h1>

//       <div className="grid gap-3">
//         {profiles.map((p) => (
//           <Link
//             key={p.id}
//             href={`/profiles/${p.id}`}
//             className="p-3 bg-white rounded shadow hover:bg-gray-100"
//           >
//             {p.name} — {p.country_name}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }






































// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";
// import Link from "next/link";
// import type { Profile } from "../../types";

// export default function ProfilesPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);

//   useEffect(() => {
//     api("/profiles?page=1&limit=20").then((res) => {
//       if (res?.data) setProfiles(res.data);
//     });
//   }, []);

//   return (
//     <div>
//       <h1 className="text-xl font-bold mb-4">Profiles</h1>

//       <div className="grid gap-3">
//         {profiles.map((profile) => (
//           <Link
//             key={profile.id}
//             href={`/profiles/${profile.id}`}
//             className="p-3 bg-white rounded shadow hover:bg-gray-100"
//           >
//             {profile.name} — {profile.country_name}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
















































// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";
// import Link from "next/link";
// import type { Profile } from "../../types";

// export default function ProfilesPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       setLoading(true);
//       setError("");

//       const response = await api("/profiles?page=1&limit=20");

//       if (!response || response.error) {
//         setError("Failed to load profiles");
//         setLoading(false);
//         return;
//       }

//       setProfiles(response.data || []);
//       setLoading(false);
//     };

//     fetchProfiles();
//   }, []);

//   if (loading) {
//     return <div className="p-6">Loading profiles...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6 space-y-4">

//       {/* PAGE TITLE */}
//       <h1 className="text-2xl font-bold">
//         All Profiles
//       </h1>

//       {/* PROFILE LIST */}
//       <div className="grid gap-4">

//         {profiles.map((profile) => (
//           <Link
//             key={profile.id}
//             href={`/profiles/${profile.id}`}
//             className="bg-white p-4 rounded shadow hover:shadow-md transition"
//           >

//             {/* NAME HEADER */}
//             <div className="text-lg font-semibold mb-2">
//               {profile.name || "Unnamed Profile"}
//             </div>

//             {/* FULL DETAILS GRID */}
//             <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">

//               {Object.entries(profile)
//                 .filter(([key]) => key !== "id")
//                 .map(([key, value]) => (
//                   <div key={key} className="flex gap-2">
//                     <span className="font-medium capitalize">
//                       {key.replaceAll("_", " ")}:
//                     </span>
//                     <span className="text-gray-600">
//                       {value !== null && value !== undefined
//                         ? String(value)
//                         : "N/A"}
//                     </span>
//                   </div>
//                 ))}

//             </div>

//           </Link>
//         ))}

//       </div>
//     </div>
//   );
// }


















































// CORRECT WORKING VERSION WITH LAYOUT JUST SEARCH ISSUE

// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";
// import Link from "next/link";
// import type { Profile } from "../../types";

// export default function ProfilesPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [countryFilter, setCountryFilter] = useState("");

//   const [, setDebouncedSearch] = useState("");
  

//   useEffect(() => {
//   const timer = setTimeout(() => {
//     setDebouncedSearch(searchQuery);
//   }, 500);

//   return () => clearTimeout(timer);
// }, [searchQuery]);

//   // useEffect(() => {
//   //   const fetchProfiles = async () => {
//   //     setLoading(true);
//   //     setError("");

//   //     // const response = await api(
//   //     //   `/profiles?page=${currentPage}&limit=10&query=${searchQuery}&country=${countryFilter}`
//   //     // );
//   //     const endpoint = searchQuery.trim().length > 0
//   //         ? `/profiles/search?q=${encodeURIComponent(
//   //             `${searchQuery} ${countryFilter}`
//   //           )}&page=${currentPage}&limit=10`
//   //         : `/profiles?page=${currentPage}&limit=10${
//   //             countryFilter
//   //               ? `&country_id=${countryFilter.toUpperCase()}`
//   //               : ""
//   //           }`;

//   //     const response = await api(endpoint);

//   //     if (!response || response.error) {
//   //       setError("Failed to load profiles");
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     setProfiles(response.data || []);

//   //     const totalRecords =
//   //       response.total ||
//   //       response.totalCount ||
//   //       response?.pagination?.total ||
//   //       response?.meta?.total ||
//   //       0;

//   //     setTotalPages(Math.max(1, Math.ceil(totalRecords / 10)));

//   //     setLoading(false);
//   //   };

//   //   fetchProfiles();
//   // }, [currentPage, searchQuery, countryFilter]);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       setLoading(true);
//       setError("");

//       const endpoint =
//         searchQuery.trim().length > 0
//           ? `/profiles/search?q=${encodeURIComponent(
//               `${searchQuery} ${countryFilter}`
//             )}&page=${currentPage}&limit=10`
//           : `/profiles?page=${currentPage}&limit=10${
//               countryFilter
//                 ? `&country_id=${countryFilter.toUpperCase()}`
//                 : ""
//             }`;

//       const response = await api(endpoint);

//       if (!response || response.error) {
//         setError("Failed to load profiles");
//         setLoading(false);
//         return;
//       }

//       setProfiles(response.data || []);
//       setTotalPages(response.pagination?.totalPages || 1);

//       setLoading(false);
//     };

//     fetchProfiles();
//   }, [currentPage, searchQuery, countryFilter]);

//   if (loading) {
//     return <div className="p-6">Loading profiles...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6 space-y-6">

//       {/* TITLE */}
//       <h1 className="text-2xl font-bold">
//         All Profiles
//       </h1>

//       {/* FILTERS */}
//       <div className="grid md:grid-cols-2 gap-4">

//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={searchQuery}
//           onChange={(e) => {
//             setCurrentPage(1);
//             setSearchQuery(e.target.value);
//           }}
//           className="border p-2 rounded w-full"
//         />

//         <input
//           type="text"
//           placeholder="Filter by country..."
//           value={countryFilter}
//           onChange={(e) => {
//             setCurrentPage(1);
//             setCountryFilter(e.target.value);
//           }}
//           className="border p-2 rounded w-full"
//         />

//       </div>

//       {/* PROFILE LIST */}
//       <div className="grid gap-4">

//         {profiles.map((profile) => (
//           <Link
//             key={profile.id}
//             href={`/profiles/${profile.id}`}
//             className="bg-white p-4 rounded shadow hover:shadow-md transition"
//           >

//             {/* NAME */}
//             <div className="text-lg font-semibold mb-2">
//               {profile.name || "Unnamed Profile"}
//             </div>

//             {/* FULL DETAILS (NO ID) */}
//             <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">

//               {Object.entries(profile)
//                 .filter(([key]) => key !== "id")
//                 .map(([key, value]) => (
//                   <div key={key} className="flex gap-2">
//                     <span className="font-medium capitalize">
//                       {key.replaceAll("_", " ")}:
//                     </span>
//                     <span className="text-gray-600">
//                       {value !== null && value !== undefined
//                         ? String(value)
//                         : "N/A"}
//                     </span>
//                   </div>
//                 ))}

//             </div>

//           </Link>
//         ))}

//       </div>

//       {/* PAGINATION */}
//       <div className="flex items-center gap-3">

//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <span className="text-sm">
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>

//       </div>

//     </div>
//   );
// }

















































// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";
// import Link from "next/link";
// import type { Profile } from "../../types";

// export default function ProfilesPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [countryFilter, setCountryFilter] = useState("");

//   // ✅ debounce search (prevents API spam)
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       setLoading(true);
//       setError("");

//       // ✅ only search when input is meaningful
//       const shouldSearch = debouncedSearch.trim().length >= 3;

//       let endpoint = "";

//       if (shouldSearch) {
//         endpoint = `/profiles/search?q=${encodeURIComponent(
//           debouncedSearch
//         )}&page=${currentPage}&limit=10`;
//       } else {
//         endpoint = `/profiles?page=${currentPage}&limit=10${
//           countryFilter ? `&country_id=${countryFilter}` : ""
//         }`;
//       }

//       const response = await api(endpoint);

//       // ✅ proper error handling
//       if (!response || response.status === "error") {
//         setError(response?.message || "Failed to load profiles");
//         setLoading(false);
//         return;
//       }

//       setProfiles(response.data || []);
//       setTotalPages(response.pagination?.totalPages || 1);

//       setLoading(false);
//     };

//     fetchProfiles();
//   }, [currentPage, debouncedSearch, countryFilter]);

//   if (loading) {
//     return <div className="p-6">Loading profiles...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6 space-y-6">

//       {/* TITLE */}
//       <h1 className="text-2xl font-bold">
//         All Profiles
//       </h1>

//       {/* FILTERS */}
//       <div className="grid md:grid-cols-2 gap-4">

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="Search profiles (min 3 characters)..."
//           value={searchQuery}
//           onChange={(event) => {
//             setCurrentPage(1);
//             setSearchQuery(event.target.value);
//           }}
//           className="border p-2 rounded w-full"
//         />

//         {/* COUNTRY FILTER (FIXED) */}
//         <select
//           value={countryFilter}
//           onChange={(event) => {
//             setCurrentPage(1);
//             setCountryFilter(event.target.value);
//           }}
//           className="border p-2 rounded w-full"
//         >
//           <option value="">All Countries</option>
//           <option value="NG">Nigeria</option>
//           <option value="US">United States</option>
//           <option value="GB">United Kingdom</option>
//         </select>

//       </div>

//       {/* PROFILE LIST */}
//       <div className="grid gap-4">

//         {profiles.map((profile) => (
//           <Link
//             key={profile.id}
//             href={`/profiles/${profile.id}`}
//             className="bg-white p-4 rounded shadow hover:shadow-md transition"
//           >

//             {/* NAME */}
//             <div className="text-lg font-semibold mb-2">
//               {profile.name || "Unnamed Profile"}
//             </div>

//             {/* FULL DETAILS (NO ID) */}
//             <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">

//               {Object.entries(profile)
//                 .filter(([key]) => key !== "id")
//                 .map(([key, value]) => (
//                   <div key={key} className="flex gap-2">
//                     <span className="font-medium capitalize">
//                       {key.replaceAll("_", " ")}:
//                     </span>
//                     <span className="text-gray-600">
//                       {value !== null && value !== undefined
//                         ? String(value)
//                         : "N/A"}
//                     </span>
//                   </div>
//                 ))}

//             </div>

//           </Link>
//         ))}

//       </div>

//       {/* PAGINATION */}
//       <div className="flex items-center gap-3">

//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((previousPage) => previousPage - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <span className="text-sm">
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((previousPage) => previousPage + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>

//       </div>

//     </div>
//   );
// }