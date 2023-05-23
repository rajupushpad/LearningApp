/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
          port: '',
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: '/dashboard/category/',
          destination: '/category/',
        },
      ];
    }
  };
  