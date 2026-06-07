/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.islamic.network',
        pathname: '/quran/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
