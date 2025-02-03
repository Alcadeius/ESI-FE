const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
