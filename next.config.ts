import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in the home directory would
  // otherwise widen Turbopack's file tracing to all of ~/.
  turbopack: { root: __dirname },

  images: {
    // Pexels placeholders today; Sanity and Cloudinary are pre-authorised so
    // swapping the media source needs no config change.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // GSAP and Sanity ship large barrel files; this keeps the client bundles lean.
    optimizePackageImports: ["motion", "lucide-react"],
  },
};

export default nextConfig;
