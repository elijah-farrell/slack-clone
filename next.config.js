/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  webpack: (config) => {
    config.externals = config.externals || []
    config.externals.push({
      'canvas': 'canvas',
    })
    return config
  },
}

module.exports = nextConfig
