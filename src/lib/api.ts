// const BASE_URL = "http://localhost:5000/api/v1";

// /**
//  * Central API handler for backend communication
//  */
// export const api = async (endpoint: string, options: any = {}) => {
//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     credentials: "include", // important for cookie auth
//   });

//   return res.json();
// };






























// const BASE_URL = "http://localhost:5000/api/v1";

// /**
//  * Central API handler for backend communication
//  */
// export const api = async (
//   endpoint: string,
//   options: RequestInit = {} // FIX: proper fetch type instead of any
// ) => {
//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     credentials: "include", // important for cookie auth
//   });

//   return res.json();
// };





























const BACKEND_URL = "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api`;
const AUTH_URL = `${BACKEND_URL}/auth`;

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

/**
 * Central API handler for backend communication
 * - Uses HTTP-only cookies for session management
 * - Handles auth errors and token refresh
 * - Adds X-API-Version header for profile endpoints
 * - Separates auth endpoints from API endpoints
 */
export const api = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    const method = options.method?.toUpperCase() || "GET";
    const headers = new Headers(options.headers || {});

    // Determine correct base URL based on endpoint type
    let baseUrl = API_URL;
    if (endpoint.startsWith("/auth/") || endpoint.startsWith("/auth")) {
      baseUrl = AUTH_URL;
    }

    // Add API version header for profile endpoints (required by backend)
    if (endpoint.startsWith("/profiles")) {
      headers.set("X-API-Version", "1");
    }

    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
      credentials: "include", // required for HTTP-only cookie auth
    });

    // 🔐 Handle unauthorized (token expired / not logged in)
    if (res.status === 401 && !isRefreshing && method === "GET") {
      // Try to refresh the token
      if (!refreshPromise) {
        isRefreshing = true;
        refreshPromise = (async () => {
          try {
            const refreshRes = await fetch(`${AUTH_URL}/refresh`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (refreshRes.ok) {
              return true;
            } else {
              // Refresh failed, redirect to login
              window.location.href = "/login";
              return false;
            }
          } catch {
            window.location.href = "/login";
            return false;
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        })();
      }

      const refreshSuccess = await refreshPromise;
      if (refreshSuccess) {
        // Token refreshed, retry original request
        const retryRes = await fetch(`${baseUrl}${endpoint}`, {
          ...options,
          headers,
          credentials: "include",
        });

        if (!retryRes.ok) {
          const errorData = await retryRes.json().catch(() => null);
          return {
            status: "error",
            message: errorData?.message || "Request failed",
          };
        }

        return await retryRes.json();
      }
      return { status: "error", message: "Authentication failed" };
    }

    // ❌ Handle other API errors
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return {
        status: "error",
        message: errorData?.message || "Request failed",
        statusCode: res.status,
      };
    }

    return await res.json();
  } catch (error) {
    console.error("API request failed:", error);
    return {
      status: "error",
      message: "Network error",
    };
  }
};