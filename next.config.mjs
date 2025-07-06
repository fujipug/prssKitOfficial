import { withNextVideo } from "next-video/process";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  }
};

export default withNextVideo(withNextIntl(nextConfig));