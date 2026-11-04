import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires all requested image qualities to be explicitly configured
    qualities: [75, 80, 85, 90, 95, 100],
  },
};

export default nextConfig;
