// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["next-auth", "react-hook-form", "zod"],
    typedRoutes: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
