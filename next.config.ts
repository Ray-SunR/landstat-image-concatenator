import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure for GitHub Pages deployment
  basePath: '/landstat-image-concatenator',
  assetPrefix: '/landstat-image-concatenator/',
};

export default nextConfig;
