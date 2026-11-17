/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // builds plain HTML/CSS/JS into ./out, ready for Hostinger shared hosting
  basePath: process.env.NEXT_PUBLIC_BASE || undefined,   // only for the GitHub Pages copy
  trailingSlash: true,       // /services/ -> services/index.html
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: { cpus: 1, workerThreads: false, webpackMemoryOptimizations: true },   // keeps the build light on small computers
};
export default nextConfig;
