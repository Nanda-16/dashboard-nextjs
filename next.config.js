/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'training.pixbit.in',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig
