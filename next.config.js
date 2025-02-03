// const { imageOptimizer } = require("next/dist/server/image-optimizer");

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://esi.bagoesesport.com";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_BASE_URL}/api/:path*`,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
