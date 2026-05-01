"use client";

import { useEffect, useState } from "react";
// import DashboardLayout from "../layout";
// import LogoutButton from "../../components/LogoutButton";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar_url?: string;
  created_at?: string;
  last_login_at?: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");

      try {
        // Use /api/user/me endpoint as requested
        // This goes through Next.js rewrite to backend
        const res = await fetch("/api/user/me", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok || data?.error) {
          setError(data?.error || data?.message || "Failed to fetch user");
          setLoading(false);
          return;
        }

        // Handle both response formats
        const userData = data?.data || data;
        setUser(userData);
      } catch (err) {
        console.error("Auth fetch error:", err);
        setError("Unable to fetch account details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      // <DashboardLayout>
        <div className="p-6">Loading account...</div>
      // </DashboardLayout>
    );
  }

  if (error) {
    return (
      // <DashboardLayout>
        <div className="p-6 text-red-500">Error: {error}</div>
      // </DashboardLayout>
    );
  }

  if (!user) {
    return (
      // <DashboardLayout>
        <div className="p-6">No user data found</div>
      // </DashboardLayout>
    );
  }

  return (
    // <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Account Settings</h1>
          {/* <LogoutButton /> */}
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded shadow">
          {/* AVATAR SECTION */}
          {user.avatar_url && (
            <div className="p-6 border-b flex items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
          )}

          {/* DETAILS SECTION */}
          <div className="p-6 space-y-4">
            {/* USERNAME */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-gray-800">{user.username}</p>
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-gray-800">{user.email}</p>
              </div>
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Account Role
              </label>
              <div className="p-3 bg-gray-50 rounded border flex items-center justify-between">
                <p className="text-gray-800 font-semibold capitalize">{user.role}</p>
                <span
                  className={`px-3 py-1 rounded text-xs font-medium text-white ${
                    user.role === "admin"
                      ? "bg-red-600"
                      : "bg-blue-600"
                  }`}
                >
                  {user.role === "admin" ? "Administrator" : "Analyst"}
                </span>
              </div>
            </div>

            {/* USER ID */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                User ID
              </label>
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-gray-800 font-mono text-sm">{user.id}</p>
              </div>
            </div>

            {/* CREATED AT */}
            {user.created_at && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Account Created
                </label>
                <div className="p-3 bg-gray-50 rounded border">
                  <p className="text-gray-800">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}

            {/* LAST LOGIN */}
            {user.last_login_at && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Login
                </label>
                <div className="p-3 bg-gray-50 rounded border">
                  <p className="text-gray-800">
                    {new Date(user.last_login_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PERMISSIONS CARD */}
        <div className="bg-white rounded shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Permissions</h3>
          <div className="space-y-3">
            {user.role === "admin" ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded border border-green-200">
                  <span className="text-green-600">✓</span>
                  <div>
                    <p className="font-medium text-green-900">Create Profiles</p>
                    <p className="text-xs text-green-700">
                      You can add new profiles to the system
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded border border-green-200">
                  <span className="text-green-600">✓</span>
                  <div>
                    <p className="font-medium text-green-900">Export Data</p>
                    <p className="text-xs text-green-700">
                      You can download profile data as CSV
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded border border-green-200">
                  <span className="text-green-600">✓</span>
                  <div>
                    <p className="font-medium text-green-900">Full Access</p>
                    <p className="text-xs text-green-700">
                      You have unrestricted access to all features
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded border border-blue-200">
                  <span className="text-blue-600">✓</span>
                  <div>
                    <p className="font-medium text-blue-900">View Profiles</p>
                    <p className="text-xs text-blue-700">
                      You can browse and search all profiles
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                  <span className="text-gray-400">✗</span>
                  <div>
                    <p className="font-medium text-gray-900">Create Profiles</p>
                    <p className="text-xs text-gray-600">
                      Only administrators can create profiles
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                  <span className="text-gray-400">✗</span>
                  <div>
                    <p className="font-medium text-gray-900">Export Data</p>
                    <p className="text-xs text-gray-600">
                      Only administrators can export profiles
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    // </DashboardLayout>
  );
}

