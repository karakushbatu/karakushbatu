import type { NextConfig } from "next";
import path from "path";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://karakushbatu.vercel.app");

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  // skip strict mode
  reactStrictMode: false,
  // Pin the workspace root so a stray lockfile higher up the tree isn't picked.
  turbopack: {
    root: path.join(__dirname),
  },
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
    googleAnalyticsId: process.env.NODE_ENV === "production" ? process.env.GA_MEASUREMENT_ID : "",
  },
};

export default nextConfig;
