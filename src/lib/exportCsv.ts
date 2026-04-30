"use client";

import { fetchCsrfToken, getCsrfHeaders } from "./csrf";

/**
 * Downloads CSV file from backend
 * Only admins have permission (enforced by backend)
 * Includes CSRF token for security
 */
export const exportCsv = async () => {
  try {
    // Fetch CSRF token for this request
    const csrfToken = await fetchCsrfToken();

    const headers = new Headers();
    if (csrfToken) {
      const csrfHeaders = getCsrfHeaders(csrfToken);
      Object.entries(csrfHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    const res = await fetch("http://localhost:5000/api/v1/profiles/export?format=csv", {
      method: "GET",
      credentials: "include",
      headers,
    });

    if (!res.ok) {
      console.error("Failed to export CSV");
      alert("Failed to export CSV. You may not have permission.");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "profiles.csv";
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("CSV export error:", error);
    alert("Error exporting CSV");
  }
};