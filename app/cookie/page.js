import { LegalPage } from '../legal-page';

export const metadata = {
  title: 'Cookie Policy',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CookiePage() {
  return <LegalPage type="cookie" />;
}
