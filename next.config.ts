import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asset.ch-si.com.tw',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.it',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
