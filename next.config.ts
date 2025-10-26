/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.pravatar.cc',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'placehold.co',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'img.youtube.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

module.exports = nextConfig;
