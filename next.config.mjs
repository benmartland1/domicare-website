/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "domicare.ai" },
      { protocol: "https", hostname: "www.domicare.ai" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
  async redirects() {
    return [
      // The domain is new, so there is no legacy URL surface to preserve yet.
      // Anything obvious a visitor might type by hand goes here.
      { source: "/aeo", destination: "/services/aeo", permanent: true },
      { source: "/ai-search", destination: "/services/aeo", permanent: true },
      { source: "/google-ads", destination: "/services/google-ads", permanent: true },
      { source: "/audit", destination: "/visibility", permanent: true },
      { source: "/services", destination: "/services/aeo", permanent: false },
    ];
  },
};

export default nextConfig;
