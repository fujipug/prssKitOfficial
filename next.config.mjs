import { withNextVideo } from "next-video/process";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  images: {
    domains: ['firebasestorage.googleapis.com', "127.0.0.1"],
  }
};

export default withNextVideo(withNextIntl(nextConfig));