/** @type {import('next').NextConfig} */
const basePath = process.env.GITHUB_PAGES === 'true' ? '/nest-website' : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
