import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // gunnthor.is redirects to www.gunnthor.is at the Vercel domain level;
  // this keeps trailing-slash behaviour predictable for canonical URLs.
  trailingSlash: false,
};

export default nextConfig;
