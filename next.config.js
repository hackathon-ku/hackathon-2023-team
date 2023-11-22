/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'google.com',
        },
      ],
    },
  }

module.exports = nextConfig
