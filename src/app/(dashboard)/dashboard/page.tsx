// "use client";

// import { useEffect, useState } from "react";

// /**
//  * Dashboard shows profile data from backend
//  * Uses cookie-based authentication
//  */
// export default function DashboardPage() {
//   const [profiles, setProfiles] = useState<any[]>([]);

//   useEffect(() => {
//     // Fetch protected backend data
//     fetch("http://localhost:5000/api/v1/profiles", {
//       credentials: "include", // sends HTTP-only cookies
//     })
//       .then((res) => res.json())
//       .then((data) => setProfiles(data.data || []));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Dashboard</h1>

//       {/* Render profiles from backend */}
//       {profiles.map((profile) => (
//         <div key={profile.id} className="border p-2 my-2">
//           <p>Name: {profile.name}</p>
//           <p>Country: {profile.country_name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

































// THE FIRST CODE THAT DISPLAYS ON DASHBOARD, BEFORE REFACTORING TO ADD ROLE-BASED UI AND ERROR HANDLING



// "use client";

// import { useEffect, useState } from "react";
// import type { Profile } from "../types";

// /**
//  * Dashboard shows profile data from backend
//  * Uses cookie-based authentication
//  */
// export default function DashboardPage() {
//   // FIX: replace any with Profile type
//   const [profiles, setProfiles] = useState<Profile[]>([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/v1/profiles", {
//       credentials: "include", // sends HTTP-only cookies
//     })
//       .then((res) => res.json())
//       .then((data) => setProfiles(data.data || []));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Dashboard</h1>

//       {/* Render profiles from backend */}
//       {profiles.map((profile) => (
//         <div key={profile.id} className="border p-2 my-2">
//           <p>Name: {profile.name}</p>
//           <p>Country: {profile.country_name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }







































// "use client";

// import { useEffect, useState } from "react";
// import type { Profile } from "../types";
// import LogoutButton from "../components/LogoutButton";
// import { useAuthRole } from "../hooks/useAuthRole";

// import { exportCsv } from "../../lib/exportCsv";

// export default function DashboardPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const role = useAuthRole();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // useEffect(() => {
//   //   fetch("http://localhost:5000/api/v1/profiles", {
//   //     credentials: "include",
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => setProfiles(data.data || []));
//   // }, []);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/v1/profiles", {
//       credentials: "include",
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to load");
//         return res.json();
//       })
//       .then((data) => setProfiles(data.data || []))
//       .catch(() => setError("Network error"))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-4">
//         <h1 className="text-xl font-bold">Dashboard</h1>
//         <LogoutButton />
//       </div>

//       {/* ROLE UI */}
//       <p className="text-sm mb-2">
//         Role: <b>{role}</b>
//       </p>

//       {/* ADMIN ONLY UI */}
//       {role === "admin" && (
//         // <button className="mb-3 px-3 py-2 bg-green-600 text-white rounded">
//         //   Export CSV
//         // </button>
//         <button onClick={exportCsv}
//           className="mb-3 px-3 py-2 bg-green-600 text-white rounded"
//         >
//           Export CSV
//         </button>
//       )}

//       {/* EMPTY STATE */}
//       {profiles.length === 0 && (
//         <p className="text-gray-500">No profiles found.</p>
//       )}

//       {/* PROFILE LIST */}
//       {profiles.map((profile) => (
//         <div key={profile.id} className="border p-2 my-2">
//           <p>Name: {profile.name}</p>
//           <p>Country: {profile.country_name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }



















































// WORKING DASHBOARD, BUT WITH LOADING AND ERROR STATES ADDED 


// "use client";

// import { useEffect, useState } from "react";
// import type { Profile } from "../types";
// import LogoutButton from "../components/LogoutButton";
// import { useAuthRole } from "../hooks/useAuthRole";

// import { exportCsv } from "../../lib/exportCsv";

// export default function DashboardPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const role = useAuthRole();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // useEffect(() => {
//   //   fetch("http://localhost:5000/api/v1/profiles", {
//   //     credentials: "include",
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => setProfiles(data.data || []));
//   // }, []);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/v1/profiles", {
//       credentials: "include",
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to load");
//         return res.json();
//       })
//       .then((data) => setProfiles(data.data || []))
//       .catch(() => setError("Network error"))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="p-6">

//       {/* LOADING STATE */}
//       {loading && <p>Loading...</p>}

//       {/* ERROR STATE */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* MAIN CONTENT (only shows when no loading/error) */}
//       {!loading && !error && (
//         <>
//           <div className="flex justify-between mb-4">
//             <h1 className="text-xl font-bold">Dashboard</h1>
//             <LogoutButton />
//           </div>

//           {/* ROLE UI */}
//           <p className="text-sm mb-2">
//             Role: <b>{role}</b>
//           </p>

//           {/* ADMIN ONLY UI */}
//           {role === "admin" && (
//             <button
//               onClick={exportCsv}
//               className="mb-3 px-3 py-2 bg-green-600 text-white rounded"
//             >
//               Export CSV
//             </button>
//           )}

//           {/* EMPTY STATE */}
//           {profiles.length === 0 && (
//             <p className="text-gray-500">No profiles found.</p>
//           )}

//           {/* PROFILE LIST */}
//           {profiles.map((profile) => (
//             <div key={profile.id} className="border p-2 my-2">
//               <p>Name: {profile.name}</p>
//               <p>Country: {profile.country_name}</p>
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// }























































// "use client";

// import { useEffect, useState } from "react";
// import type { Profile } from "../types";
// import LogoutButton from "../components/LogoutButton";
// import { useAuthRole } from "../hooks/useAuthRole";

// import { exportCsv } from "../../lib/exportCsv";

// export default function DashboardPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const role = useAuthRole();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // useEffect(() => {
//   //   fetch("http://localhost:5000/api/v1/profiles", {
//   //     credentials: "include",
//   //   })
//   //     .then((res) => {
//   //       if (!res.ok) throw new Error("Failed to load");
//   //       return res.json();
//   //     })
//   //     .then((data) => setProfiles(data.data || []))
//   //     .catch(() => setError("Network error"))
//   //     .finally(() => setLoading(false));
//   // }, []);

//   useEffect(() => {
//     setLoading(true);

//     fetch(`http://localhost:5000/api/v1/profiles?page=${page}&limit=10`, {
//       credentials: "include",
//     })
//       .then((res) => {
//         if (res.status === 401) {
//           window.location.href = "/login";
//           return;
//         }
//         if (!res.ok) throw new Error("Failed to load");
//         return res.json();
//       })
//       .then((data) => {
//         setProfiles(data.data || []);
//         setTotalPages(data.pagination?.totalPages || 1); // depends on your backend
//       })
//       .catch(() => setError("Network error"))
//       .finally(() => setLoading(false));
//   }, [page]);

//   return (
//     <div className="p-6">

//       {/* LOADING STATE */}
//       {loading && <p>Loading...</p>}

//       {/* ERROR STATE */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* MAIN CONTENT (only shows when no loading/error) */}
//       {!loading && !error && (
//         <>
//           <div className="">
//             <input type="text" placeholder="Search profiles..."
//               className="border p-2 mb-3 w-full"
//               onChange={(event) => {
//                 fetch(`http://localhost:5000/api/v1/profiles?query=${event.target.value}`, {
//                   credentials: "include",
//                 })
//                   .then((res) => res.json())
//                   .then((data) => setProfiles(data.data || []));
//               }}
//             />
//             <div className="flex justify-between mb-4">
//               <h1 className="text-xl font-bold">Dashboard</h1>
//               <LogoutButton />
//             </div>
//           </div>

//           {/* ROLE UI */}
//           <p className="text-sm mb-2">
//             Role: <b>{role}</b>
//           </p>

//           {/* ADMIN ONLY UI */}
//           {role === "admin" && (
//             <button
//               onClick={exportCsv}
//               className="mb-3 px-3 py-2 bg-green-600 text-white rounded"
//             >
//               Export CSV
//             </button>
//           )}

//           {/* EMPTY STATE */}
//           {profiles.length === 0 && (
//             <p className="text-gray-500">No profiles found.</p>
//           )}

//           {/* PROFILE LIST */}
//           {profiles.map((profile) => (
//             <div key={profile.id} className="border p-2 my-2">
//               <p>Name: {profile.name}</p>
//               <p>Country: {profile.country_name}</p>
//             </div>
//           ))}

//           {/* PAGINATION */}
//           <div className="flex gap-2 mt-4">
//             <button disabled={page === 1}
//               onClick={() => setPage((prev) => prev - 1)}
//               className="px-3 py-1 border rounded"
//             >
//               Prev
//             </button>

//             <span>Page {page} of {totalPages}</span>

//             <button disabled={page === totalPages}
//               onClick={() => setPage((prev) => prev + 1)}
//               className="px-3 py-1 border rounded"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }





































































// "use client";

// import { useEffect, useState } from "react";
// import type { Profile } from "../types";
// import LogoutButton from "../components/LogoutButton";
// import { useAuthRole } from "../hooks/useAuthRole";
// import { exportCsv } from "@/lib/exportCsv";
// import { api } from "@/lib/api";

// export default function DashboardPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const role = useAuthRole();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [search, setSearch] = useState("");

//   /**
//    * FETCH DATA (pagination + search combined)
//    */
//   // useEffect(() => {
//   //   const fetchProfiles = async () => {
//   //     setError("");

//   //     const data = await api(
//   //       `/profiles?page=${page}&limit=10&query=${search}`
//   //     );

//   //     // if (!data || data.error) {
//   //     //   setError("Network error");
//   //     //   setLoading(false);
//   //     //   return;
//   //     // }

//   //     if (!data || data.status !== "success") {
//   //       setError("Network error");
//   //       setLoading(false);
//   //       return;
//   //     }
      
//   //     setProfiles(data.data || []);
//   //     // setTotalPages(data.pagination?.totalPages || 1);
//   //     setTotalPages(Math.ceil(data.total / 10) || 1);
//   //     setLoading(false);
//   //   };

//   //   fetchProfiles();
//   // }, [page, search]);




//   // useEffect(() => {
//   //   const fetchProfiles = async () => {
//   //     setLoading(true);
//   //     setError("");

//   //     const data = await api(
//   //       // `/profiles?page=${page}&limit=10&query=${search}`
//   //       `/profiles?page=${page}&limit=10&q=${search}`
//   //     );

//   //     console.log("API RESPONSE:", data);

//   //     if (!data || data.error) {
//   //       setError(data?.error || "Network error");
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     setProfiles(data.data || []);

//   //     const total = data.total ?? 0;
//   //     const limit = 10;

//   //     setTotalPages(Math.max(1, Math.ceil(total / limit)));

//   //     setLoading(false);
//   //   };

//   //   fetchProfiles();
//   // }, [page, search]);


// useEffect(() => {
//   const fetchProfiles = async () => {
//     setLoading(true);
//     setError("");

//     const endpoint = search
//       ? `/profiles/search?q=${encodeURIComponent(search)}&page=${page}&limit=10`
//       : `/profiles?page=${page}&limit=10`;

//     const data = await api(endpoint);

//     console.log("API RESPONSE:", data);

//     if (!data || data.error) {
//       setError(data?.error || "Network error");
//       setLoading(false);
//       return;
//     }

//     setProfiles(data.data || []);

//     const total = data.total ?? 0;
//     const limit = 10;

//     setTotalPages(Math.max(1, Math.ceil(total / limit)));

//     setLoading(false);
//   };

//   fetchProfiles();
// }, [page, search]);











//   /**
//    * LOADING UI
//    */
//   if (loading) {
//     return <p className="p-6">Loading...</p>;
//   }

//   /**
//    * ERROR UI
//    */
//   if (error) {
//     return <p className="p-6 text-red-500">{error}</p>;
//   }

//   return (
//     <div className="p-6">

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search profiles..."
//         className="border p-2 mb-3 w-full"
//         value={search}
//         onChange={(event) => {
//           setPage(1); // reset pagination
//           setSearch(event.target.value);
//         }}
//       />

//       {/* HEADER */}
//       <div className="flex justify-between mb-4">
//         <h1 className="text-xl font-bold">Dashboard</h1>
//         <LogoutButton />
//       </div>

//       {/* ROLE */}
//       <p className="text-sm mb-2">
//         Role: <b>{role}</b>
//       </p>

//       {/* ADMIN */}
//       {role === "admin" && (
//         <button
//           onClick={exportCsv}
//           className="mb-3 px-3 py-2 bg-green-600 text-white rounded"
//         >
//           Export CSV
//         </button>
//       )}

//       {/* EMPTY STATE */}
//       {profiles.length === 0 ? (
//         <p className="text-gray-500">No profiles found.</p>
//       ) : (
//         profiles.map((profile) => (
//           <div key={profile.id} className="border p-2 my-2">
//             <p>Name: {profile.name}</p>
//             <p>Country: {profile.country_name}</p>
//           </div>
//         ))
//       )}

//       {/* PAGINATION */}
//       <div className="flex gap-2 mt-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((prev) => prev - 1)}
//           className="px-3 py-1 border rounded"
//         >
//           Prev
//         </button>

//         <span>
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((prev) => prev + 1)}
//           className="px-3 py-1 border rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }








































// export default function DashboardPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="p-4 bg-white rounded shadow">Total Profiles</div>
//         <div className="p-4 bg-white rounded shadow">Active Users</div>
//         <div className="p-4 bg-white rounded shadow">System Status</div>
//       </div>
//     </div>
//   );
// }






































// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";
// import { useAuthRole } from "../../hooks/useAuthRole";
// import type { Profile } from "../../types";

// export default function DashboardPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const role = useAuthRole();

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setLoading(true);
//       setError("");

//       const res = await api("/profiles?page=1&limit=100");

//       if (!res || res.error) {
//         setError("Failed to load dashboard data");
//         setLoading(false);
//         return;
//       }

//       setProfiles(res.data || []);
//       setLoading(false);
//     };

//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return <p className="p-6">Loading dashboard...</p>;
//   }

//   if (error) {
//     return <p className="p-6 text-red-500">{error}</p>;
//   }

//   // Task 3 real metrics
//   const totalProfiles = profiles.length;
//   const activeUsers = profiles.filter((p) => p.age > 18).length;
//   const systemStatus = totalProfiles > 0 ? "Healthy" : "No Data Available";

//   return (
//     <div className="p-6 space-y-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Dashboard Overview</h1>
//       </div>

//       {/* ROLE DISPLAY */}
//       <p className="text-sm">
//         Role: <b>{role}</b>
//       </p>

//       {/* METRICS */}
//       <div className="grid md:grid-cols-3 gap-4">

//         <div className="p-4 bg-white rounded shadow">
//           <p className="text-sm text-gray-500">Total Profiles</p>
//           <p className="text-2xl font-bold">{totalProfiles}</p>
//         </div>

//         <div className="p-4 bg-white rounded shadow">
//           <p className="text-sm text-gray-500">Active Users</p>
//           <p className="text-2xl font-bold">{activeUsers}</p>
//         </div>

//         <div className="p-4 bg-white rounded shadow">
//           <p className="text-sm text-gray-500">System Status</p>
//           <p className="text-2xl font-bold">{systemStatus}</p>
//         </div>

//       </div>

//       {/* RECENT PROFILES */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-bold mb-3">Recent Profiles</h2>

//         {profiles.slice(0, 5).map((profile) => (
//           <div
//             key={profile.id}
//             className="border-b py-2 text-sm flex justify-between"
//           >
//             <span>{profile.name}</span>
//             <span className="text-gray-500">{profile.country_name}</span>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }















































// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";
// import { useAuthRole } from "../../hooks/useAuthRole";
// import type { Profile } from "../../types";

// export default function DashboardPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const role = useAuthRole();

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setLoading(true);
//       setError("");

//       const res = await api(`/profiles?page=${page}&limit=10`);

//       if (!res || res.error) {
//         setError("Failed to load dashboard data");
//         setLoading(false);
//         return;
//       }

//       setProfiles(res.data || []);

//       const total = res.total ?? 0;
//       const limit = 10;

//       setTotalPages(Math.max(1, Math.ceil(total / limit)));

//       setLoading(false);
//     };

//     fetchDashboardData();
//   }, [page]);

//   if (loading) {
//     return <p className="p-6">Loading dashboard...</p>;
//   }

//   if (error) {
//     return <p className="p-6 text-red-500">{error}</p>;
//   }

//   // REAL SYSTEM METRICS (Task 3 expectation)
//   const totalProfiles = profiles.length;
//   const activeUsers = profiles.filter((p) => p.age >= 18).length;
//   const countriesCovered = new Set(profiles.map((p) => p.country_name)).size;

//   const systemStatus =
//     totalProfiles > 0 ? "Operational" : "No Data Available";

//   return (
//     <div className="p-6 space-y-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Insighta Labs Dashboard</h1>
//       </div>

//       {/* ROLE */}
//       <p className="text-sm text-gray-600">
//         Role: <b>{role}</b>
//       </p>

//       {/* METRICS GRID */}
//       <div className="grid md:grid-cols-3 gap-4">

//         <div className="p-4 bg-white rounded shadow">
//           <p className="text-sm text-gray-500">Profiles (Current Page)</p>
//           <p className="text-2xl font-bold">{totalProfiles}</p>
//         </div>

//         <div className="p-4 bg-white rounded shadow">
//           <p className="text-sm text-gray-500">Active Users (18+)</p>
//           <p className="text-2xl font-bold">{activeUsers}</p>
//         </div>

//         <div className="p-4 bg-white rounded shadow">
//           <p className="text-sm text-gray-500">Countries Covered</p>
//           <p className="text-2xl font-bold">{countriesCovered}</p>
//         </div>

//       </div>

//       {/* SYSTEM STATUS */}
//       <div className="p-4 bg-white rounded shadow">
//         <p className="text-sm text-gray-500">System Status</p>
//         <p className="text-xl font-semibold">{systemStatus}</p>
//       </div>

//       {/* RECENT PROFILES */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-bold mb-3">Recent Profiles</h2>

//         {profiles.slice(0, 5).map((profile) => (
//           <div
//             key={profile.id}
//             className="border-b py-2 text-sm flex justify-between"
//           >
//             <span>{profile.name}</span>
//             <span className="text-gray-500">{profile.country_name}</span>
//           </div>
//         ))}
//       </div>

//       {/* PAGINATION */}
//       <div className="flex gap-2 items-center">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <span className="text-sm">
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
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
// import { useAuthRole } from "../../hooks/useAuthRole";
// import type { Profile } from "../../types";

// export default function DashboardPage() {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const role = useAuthRole();

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       setLoading(true);
//       setError("");

//       const response = await api(
//         `/profiles?page=${currentPage}&limit=10`
//       );

//       if (!response || response.error) {
//         setError("Failed to load profiles");
//         setLoading(false);
//         return;
//       }

//       setProfiles(response.data || []);

//       const totalRecords = response.total ?? 0;
//       const pageSize = 10;

//       setTotalPages(Math.max(1, Math.ceil(totalRecords / pageSize)));

//       setLoading(false);
//     };

//     fetchProfiles();
//   }, [currentPage]);

//   if (loading) {
//     return <p className="p-6">Loading dashboard data...</p>;
//   }

//   if (error) {
//     return <p className="p-6 text-red-500">{error}</p>;
//   }

//   // =========================
//   // REAL SYSTEM METRICS
//   // =========================

//   const totalProfilesOnPage = profiles.length;

//   const activeUsersOnPage = profiles.filter(
//     (profile) => profile.age >= 18
//   ).length;

//   const uniqueCountries = new Set(
//     profiles.map((profile) => profile.country_name)
//   ).size;

//   const systemStatus =
//     totalProfilesOnPage > 0 ? "Operational" : "No Data Available";

//   return (
//     <div className="p-6 space-y-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">
//           Insighta Labs Dashboard
//         </h1>
//       </div>

//       {/* ROLE */}
//       <p className="text-sm text-gray-600">
//         Role: <b>{role}</b>
//       </p>

//       {/* METRICS CARDS */}
//       <div className="grid md:grid-cols-3 gap-4">

//         <div className="p-4 bg-white rounded shadow">
//           <p className="text-sm text-gray-500">
//             Profiles on Current Page
//           </p>
//           <p className="text-2xl font-bold">
//             {totalProfilesOnPage}
//           </p>
//         </div>

//         <div className="p-4 bg-white rounded shadow">
//           <p className="text-sm text-gray-500">
//             Active Users (18+)
//           </p>
//           <p className="text-2xl font-bold">
//             {activeUsersOnPage}
//           </p>
//         </div>

//         <div className="p-4 bg-white rounded shadow">
//           <p className="text-sm text-gray-500">
//             Countries on Page
//           </p>
//           <p className="text-2xl font-bold">
//             {uniqueCountries}
//           </p>
//         </div>

//       </div>

//       {/* SYSTEM STATUS */}
//       <div className="p-4 bg-white rounded shadow">
//         <p className="text-sm text-gray-500">System Status</p>
//         <p className="text-xl font-semibold">{systemStatus}</p>
//       </div>

//       {/* PROFILE LIST */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-bold mb-3">Profiles</h2>

//         {profiles.slice(0, 10).map((profile) => (
//           <div
//             key={profile.id}
//             className="border-b py-2 text-sm flex justify-between"
//           >
//             <span>{profile.name}</span>
//             <span className="text-gray-500">
//               {profile.country_name}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* PAGINATION */}
//       <div className="flex gap-2 items-center">

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

  // =========================
  // METRICS (CURRENT PAGE)
  // =========================

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
      {/* <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">Profiles</h2>

        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="border-b py-2 flex justify-between text-sm"
          >
            <span>{profile.name}</span>
            <span className="text-gray-500">
              {profile.country_name}
            </span>
          </div>
        ))}
      </div> */}


      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">Profiles</h2>

        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="border-b py-4 text-sm space-y-2"
          >
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

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="text-sm">
          Page {currentPage} of {totalPages}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}