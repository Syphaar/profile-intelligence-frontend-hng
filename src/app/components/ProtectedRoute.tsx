"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check user status - endpoint depends on backend implementation
        // Could be /auth/me or by attempting a basic profile fetch
        const res = await fetch("http://localhost:5000/api/profiles?limit=1", {
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthed(true);
        } else if (res.status === 401) {
          // Not authenticated
          router.push("/login");
        } else {
          // Other error, redirect to login to be safe
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthed) {
    return null; // Router will redirect
  }

  return <>{children}</>;
}
