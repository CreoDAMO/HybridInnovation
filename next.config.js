/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir is now enabled by default in Next.js 15
  },
  async rewrites() {
    return [
      {
        source: '/api/hybrid/:path*',
        destination: 'http://0.0.0.0:8080/api/hybrid/:path*',
      },
      {
        source: '/api/spiral/:path*',
        destination: 'http://0.0.0.0:8080/api/spiral/:path*',
      },
      {
        source: '/api/htsx/:path*',
        destination: 'http://0.0.0.0:8080/api/htsx/:path*',
      },
      {
        source: '/api/parse',
        destination: 'http://0.0.0.0:8080/api/parse',
      },
      {
        source: '/api/languages',
        destination: 'http://0.0.0.0:8080/api/languages',
      },
      {
        source: '/api/parser/:path*',
        destination: 'http://0.0.0.0:8080/api/parser/:path*',
      },
      {
        source: '/health',
        destination: 'http://0.0.0.0:8080/health',
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