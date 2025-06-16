import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure for GitHub Pages deployment only in production
  basePath: isProd ? '/landstat-image-concatenator' : '',
  assetPrefix: isProd ? '/landstat-image-concatenator/' : '',
};

export default nextConfig;
