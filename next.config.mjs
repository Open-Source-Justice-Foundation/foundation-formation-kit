// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // @ts-expect-error: Used to handle the type error - Parameter 'rule' implicitly has 'any' type.
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
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
