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
    // Fixes issues with argon2 and vercel
    // - https://github.com/vercel/next.js/discussions/65978
    // - https://github.com/ranisalt/node-argon2/issues/402#issuecomment-2073016949
    outputFileTracingIncludes: {
      "/": ["../../node_modules/argon2/prebuilds/linux-x64/*"],
    },
  },
};

export default nextConfig;
