/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/arsenal', destination: '/facas', permanent: false },
      { source: '/faca/:slug', destination: '/produto/:slug', permanent: false },
    ];
  },
};
export default nextConfig;
