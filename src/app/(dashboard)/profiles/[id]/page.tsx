// "use client";

// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import ProtectedRoute from "../../components/ProtectedRoute";
// import { api } from "@/lib/api";

// export default function ProfileDetail({ params }: any) {
//   const [profile, setProfile] = useState<any>(null);

//   useEffect(() => {
//     const load = async () => {
//       const res = await api(`/profiles/${params.id}`);
//       setProfile(res);
//     };

//     load();
//   }, [params.id]);

//   return (
//     <ProtectedRoute>
//       <Layout>
//         {profile && (
//           <div className="bg-white p-6 rounded shadow">
//             <h1 className="text-xl font-bold">{profile.name}</h1>
//             <p className="text-gray-500">{profile.country_name}</p>
//           </div>
//         )}
//       </Layout>
//     </ProtectedRoute>
//   );
// }
































// "use client";

// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import ProtectedRoute from "../../components/ProtectedRoute";
// import { api } from "@/lib/api";

// export default function ProfileDetail({ params }: any) {
//   const [profile, setProfile] = useState<any>(null);

//   useEffect(() => {
//     const load = async () => {
//       const res = await api(`/profiles/${params.id}`);
//       setProfile(res);
//     };

//     load();
//   }, [params.id]);

//   return (
//     <ProtectedRoute>
//       <Layout>
//         {profile && (
//           <div className="bg-white p-6 rounded shadow">
//             <h1 className="text-xl font-bold">{profile.name}</h1>
//             <p>{profile.country_name}</p>
//             <p>Gender: {profile.gender}</p>
//             <p>Age: {profile.age}</p>
//           </div>
//         )}
//       </Layout>
//     </ProtectedRoute>
//   );
// }




































// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { api } from "@/lib/api";

// export default function ProfileDetailPage() {
//   const { id } = useParams();
//   const [profile, setProfile] = useState<any>(null);

//   useEffect(() => {
//     api(`/profiles/${id}`).then((res) => {
//       if (res?.data) setProfile(res.data);
//     });
//   }, [id]);

//   if (!profile) return <p>Loading...</p>;

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h1 className="text-xl font-bold">{profile.name}</h1>
//       <p>Country: {profile.country_name}</p>
//       <p>Age: {profile.age}</p>
//     </div>
//   );
// }









































// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { api } from "@/lib/api";
// import type { Profile } from "@/app/types";

// export default function ProfileDetailPage() {
//   const { id } = useParams();

//   const [profile, setProfile] = useState<Profile | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     api(`/profiles/${id}`).then((res) => {
//       if (res?.data) setProfile(res.data);
//     });
//   }, [id]);

//   if (!profile) return <p>Loading...</p>;

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h1 className="text-xl font-bold">{profile.name}</h1>
//       <p>Country: {profile.country_name}</p>
//       <p>Age: {profile.age}</p>
//     </div>
//   );
// }

















































// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { api } from "@/lib/api";
// import type { Profile } from "@/app/types";

// export default function ProfileDetailPage() {
//   // const { id } = useParams();
//   const params = useParams();
//   const id = Array.isArray(params.id) ? params.id[0] : params.id;

//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!id) return;

//     const fetchProfile = async () => {
//       setLoading(true);
//       setError("");

//       // const res = await api(`/api/v1/profiles/${id}`);
//       const res = await api(`/api/v1/profiles/${id}`, {
//         credentials: "include",
//       });

//       if (!res || res.error) {
//         setError("Failed to load profile");
//         setLoading(false);
//         return;
//       }

//       setProfile(res.data);
//       setLoading(false);
//     };

//     fetchProfile();
//   }, [id]);

//   if (loading) {
//     return <div className="p-6">Loading profile...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   if (!profile) {
//     return <div className="p-6">Profile not found</div>;
//   }

//   return (
//     <div className="p-6 space-y-6 bg-white rounded shadow">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-bold">
//           {profile.name || "Unnamed Profile"}
//         </h1>
//         <p className="text-gray-500">
//           Full Profile Intelligence View
//         </p>
//       </div>

//       {/* DETAILS GRID */}
//       <div className="grid md:grid-cols-2 gap-4 text-sm">

//         {Object.entries(profile)
//           .filter(([key]) => key !== "id")
//           .map(([key, value]) => (
//             <div
//               key={key}
//               className="border p-3 rounded bg-gray-50"
//             >
//               <div className="font-semibold capitalize mb-1">
//                 {key.replaceAll("_", " ")}
//               </div>

//               <div className="text-gray-700 wrap-break-words">
//                 {formatValue(value)}
//               </div>
//             </div>
//           ))}

//       </div>
//     </div>
//   );
// }

// /**
//  * Safely formats any type of value for display
//  */
// function formatValue(value: unknown): string {
//   if (value === null || value === undefined) return "N/A";

//   if (typeof value === "object") {
//     return JSON.stringify(value, null, 2);
//   }

//   return String(value);
// }










































"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import type { Profile } from "@/app/types";

export default function ProfileDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
        // ✅ IMPORTANT: DO NOT prefix /api/v1 here
        const res = await api(`/profiles/${id}`, {
          withCredentials: true, // required for cookie-based auth (Stage 3)
        });

        console.log("Profile API response:", res);

        if (!res || res.error) {
          setError(res?.message || "Failed to load profile");
          setLoading(false);
          return;
        }

        setProfile(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Something went wrong while loading profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="p-6">Profile not found</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-white rounded shadow">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          {profile.name || "Unnamed Profile"}
        </h1>
        <p className="text-gray-500">
          Full Profile Intelligence View
        </p>
      </div>

      {/* DETAILS GRID */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">

        {Object.entries(profile)
          .filter(([key]) => key !== "id")
          .map(([key, value]) => (
            <div key={key} className="border p-3 rounded bg-gray-50">

              <div className="font-semibold capitalize mb-1">
                {key.replaceAll("_", " ")}
              </div>

              <div className="text-gray-700 wrap-break-words">
                {formatValue(value)}
              </div>

            </div>
          ))}

      </div>
    </div>
  );
}

/**
 * Safely formats any type of value for display
 */
function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "N/A";

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}