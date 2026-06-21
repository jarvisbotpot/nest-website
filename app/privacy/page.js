import { LegalPage } from '../legal-page';

export const metadata = {
  title: 'Privacy Policy',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return <LegalPage type="privacy" />;
}
