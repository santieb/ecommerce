/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['mdbootstrap.com', 'encrypted-tbn0.gstatic.com', 'insanelygoodrecipes.com', 'i.imgur.com'],
  },
}

module.exports = nextConfig
