import type { NextConfig } from "next";

// Same-origin proxy for browser API calls (see src/lib/api/gateway.ts).
// Evaluated at build time, so BACKEND_ORIGIN must be set when building.
const backendOrigin = process.env.BACKEND_ORIGIN ?? "http://localhost:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendOrigin}/:path*`,
      },
    ];
  },
};

export default nextConfig;
