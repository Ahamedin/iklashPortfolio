import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["animejs"],
  images: {
    domains: ["img.youtube.com"],
  },
};

export default nextConfig;