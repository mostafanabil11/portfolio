import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Covers are shown up to full viewport width on large screens.
    deviceSizes: [640, 828, 1080, 1440, 1920, 2400],
  },
};

export default nextConfig;
