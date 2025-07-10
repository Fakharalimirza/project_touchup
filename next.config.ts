
import type {NextConfig} from 'next';

require('dotenv').config({ path: './.env' });

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
    config.externals.push("@react-email/render", "@react-email/components");
    return config;
  },
};

export default withNextIntl(nextConfig);
