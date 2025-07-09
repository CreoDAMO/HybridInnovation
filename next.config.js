/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir is now enabled by default in Next.js 15
  },
  async rewrites() {
    return [
      {
        source: '/api/streamlit/:path*',
        destination: 'http://localhost:8501/:path*',
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
