"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
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

    // Forward the code to the backend callback endpoint
    // Backend will exchange code for tokens and set cookies
    window.location.href = `http://localhost:5000/auth/github/callback?code=${code}`;
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Completing login...</p>
    </div>
  );
}

      if (!code) {
        router.push("/login");
        return;
      }

      try {
        // Exchange code for session via backend
        // Backend will set HTTP-only cookies with access and refresh tokens
        const response = await fetch(
          `http://localhost:5000/auth/github/callback?code=${code}${state ? `&state=${state}` : ""}`,
          {
            method: "GET",
            credentials: "include", // Important: allows setting HTTP-only cookies
          }
        );

        if (response.ok) {
          // Session established via cookies, redirect to dashboard
          router.push("/dashboard");
        } else {
          // Authentication failed
          const error = await response.json().catch(() => null);
          console.error("Auth callback failed:", error);
          router.push("/login");
        }
      } catch (error) {
        console.error("Callback processing failed:", error);
        router.push("/login");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        </div>
        <p className="text-gray-600">Authenticating with GitHub...</p>
      </div>
    </div>
  );
}
