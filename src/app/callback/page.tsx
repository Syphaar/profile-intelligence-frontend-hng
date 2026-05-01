"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const error = params.get("error");

      if (error) {
        console.error("GitHub OAuth error:", error);
        router.push("/login?error=oauth_failed");
        return;
      }

      if (!code) {
        router.push("/login");
        return;
      }

      try {
        // Send code to backend (IMPORTANT: replace localhost in production later)
        const response = await fetch(
          `http://localhost:5000/auth/github/callback?code=${code}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          router.push("/dashboard");
        } else {
          console.error("Auth failed");
          router.push("/login");
        }
      } catch (error) {
        console.error("Callback error:", error);
        router.push("/login");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Completing login...</p>
    </div>
  );
}