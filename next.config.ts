import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Proxy API requests to backend
  async rewrites() {
    return [
      // Auth endpoints (no /api/v1 prefix)
      {
        source: "/auth/:path*",
        destination: "http://localhost:5000/auth/:path*",
      },
      // Profile API endpoints (with /api/v1 prefix)
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:5000/api/v1/:path*",
      },
      // User endpoint (with /api prefix but no /v1)
      {
        source: "/api/user/:path*",
        destination: "http://localhost:5000/api/user/:path*",
      },
    ];
  },
};

export default nextConfig;
