/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir is now enabled by default in Next.js 15
  },
  async rewrites() {
    return [
      {
        source: '/api/hybrid/:path*',
        destination: 'http://localhost:8000/api/hybrid/:path*',
      },
      {
        source: '/api/spiral/:path*',
        destination: 'http://localhost:8000/api/spiral/:path*',
      },
      {
        source: '/api/blockchain/:path*',
        destination: 'http://localhost:8000/api/blockchain/:path*',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
