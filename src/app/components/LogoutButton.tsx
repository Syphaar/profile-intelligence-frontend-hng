"use client";

import { useRouter } from "next/navigation";
import { fetchCsrfToken, getCsrfHeaders } from "@/lib/csrf";

/**
 * Logout button
 * Calls backend logout endpoint and clears session cookies
 * Includes CSRF token for security
 */
export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Get CSRF token for this request
      const csrfToken = await fetchCsrfToken();

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (csrfToken) {
        const csrfHeaders = getCsrfHeaders(csrfToken);
        Object.assign(headers, csrfHeaders);
      }
      if (!csrfToken) {
        console.error("Missing CSRF token");
        return;
      }

      const res = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
        headers,
      });

      if (res.ok) {
        // Redirect to login after logout
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded"
    >
      Logout
    </button>
  );
}