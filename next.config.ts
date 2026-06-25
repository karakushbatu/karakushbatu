import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // skip strict mode
  reactStrictMode: false,
  // Pin the workspace root so a stray lockfile higher up the tree isn't picked.
  turbopack: {
    root: path.join(__dirname),
  },
  env: {
    googleAnalyticsId: process.env.NODE_ENV === "production" ? process.env.GA_MEASUREMENT_ID : "",
  }
};

export default nextConfig;
