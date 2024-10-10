/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Remove the cssModules option as it's not recognized
  // cssModules: true,
  images: {
    remotePatterns: [
      {hostname:'images.unsplash.com'},
      {hostname: 'kagi.com'},
      {hostname: 'lh3.googleusercontent.com'},
      {hostname:'assets.aceternity.com'},
      {hostname:'i.ytimg.com'}
    ]
  },
};

export default nextConfig;
