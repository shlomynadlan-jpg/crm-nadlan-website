import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // FIX-003: canonicalize deal_type to Hebrew
      { source: '/:locale/properties', has: [{ type: 'query', key: 'deal_type', value: 'sale' }], destination: '/:locale/properties?deal_type=%D7%9E%D7%9B%D7%99%D7%A8%D7%94', permanent: true },
      { source: '/:locale/properties', has: [{ type: 'query', key: 'deal_type', value: 'rent' }], destination: '/:locale/properties?deal_type=%D7%94%D7%A9%D7%9B%D7%A8%D7%94', permanent: true },
      // FIX-002: canonicalize city name spelling
      { source: '/:locale/city/%D7%A4%D7%AA%D7%97-%D7%AA%D7%A7%D7%95%D7%94', destination: '/:locale/city/%D7%A4%D7%AA%D7%97-%D7%AA%D7%A7%D7%95%D7%95%D7%94', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
      { protocol: 'https', hostname: 'image.pollinations.ai' },
    ],
  },
};

export default withNextIntl(nextConfig);
