/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable CSS Modules
  cssModules: true,
  // Optionally, you can add more configurations here
  images: {
    remotePatterns: [
        {hostname:'images.unsplash.com'},
        {hostname: 'kagi.com'},
        {hostname:'assets.aceternity.com'},
        {hostname:'i.ytimg.com'}
    ]
},
};

export default nextConfig;
