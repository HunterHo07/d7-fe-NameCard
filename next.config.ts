import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/d7-fe-NameCard' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/d7-fe-NameCard' : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    // Disable ESLint during production builds for now
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript type checking during production builds for now
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
};

export default nextConfig;
