/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.si.com'],
    remotePatterns: [
      {
        // Should do it on production, only limit to the images that you trusted
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
    ]
  }
}

module.exports = nextConfig
