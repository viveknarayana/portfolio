/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    async redirects() {
      return [
        {
          source: "/vivaanproject",
          destination: "/vivaanproject/index.html",
          permanent: false,
        },
        {
          source: "/vivaanproject/",
          destination: "/vivaanproject/index.html",
          permanent: false,
        },
      ];
    },
  };

  module.exports = nextConfig;
  