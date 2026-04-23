/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' *.mitiendanube.com *.febecos.com febecos.com",
          },
        ],
      },
    ]
  },
}
module.exports = nextConfig
