/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // colocamos os dominios de img
  images: {
    domains: [
      'files.stripe.com',
    ]
  }
}

module.exports = nextConfig
