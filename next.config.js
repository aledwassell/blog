/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.ts',
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
