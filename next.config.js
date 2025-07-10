
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable app directory
    appDir: true,
    // Add custom extensions for HTSX and SpiralLang
    extensionAlias: {
      '.htsx': ['.htsx', '.htsx.ts', '.htsx.tsx'],
      '.spiral': ['.spiral', '.spiral.ts'],
      '.consciousness': ['.consciousness', '.cons']
    }
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom loaders for Spiral languages
    config.module.rules.push({
      test: /\.spiral$/,
      use: {
        loader: 'spiral-lang-loader',
        options: {
          consciousness: true,
          quantum: true,
          truthEngine: 'QASF'
        }
      }
    });

    config.module.rules.push({
      test: /\.htsx$/,
      use: {
        loader: 'htsx-runtime-loader',
        options: {
          runtime: 'quantum',
          engine: 'HTSX-Engine',
          consciousness: true
        }
      }
    });

    // Add HTSX and SpiralLang extensions
    config.resolve.extensions.push('.htsx', '.spiral', '.consciousness');

    // Enable WebAssembly for SpiralLang runtime
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true
    };

    return config;
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
        source: '/api/htsx/:path*',
        destination: 'http://localhost:8000/api/htsx/:path*',
      },
      {
        source: '/api/parse',
        destination: 'http://localhost:8000/api/parse',
      },
      {
        source: '/api/languages',
        destination: 'http://localhost:8000/api/languages',
      },
      {
        source: '/api/parser/:path*',
        destination: 'http://localhost:8000/api/parser/:path*',
      },
      {
        source: '/health',
        destination: 'http://localhost:8000/health',
      },
    ];
  }
};

module.exports = nextConfig;
