import { isPublicPreview } from './site-paths';

export const dynamic = 'force-static';

export default function robots() {
  if (isPublicPreview) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://nest-pavia.it/sitemap.xml',
  };
}
