import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Rein statische Seite — laesst sich auf jedem Host ausliefern
     (Vercel, Netlify, S3, klassisches Webhosting). */
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
