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
};

module.exports = nextConfig;
