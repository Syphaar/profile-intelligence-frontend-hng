"use client";

import { useEffect, useState } from "react";

/**
 * Gets user role from backend session
 * Fetches from /auth/me endpoint which returns current user info
 */
export const useAuthRole = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/auth/me", {
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Failed to fetch user role");
          return;
        }

        const data = await response.json();
        setRole(data?.data?.role || data?.role || null);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchRole();
  }, []);

  return role;
};