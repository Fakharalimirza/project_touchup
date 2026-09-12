
import type {NextConfig} from 'next';

const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'touchup.ae',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // Explicit @ alias for Linux/CageFS where tsconfig paths may not be resolved
    const path = require('path');
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, './src'),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
