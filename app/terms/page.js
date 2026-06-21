import { LegalPage } from '../legal-page';

export const metadata = {
  title: 'Termini e Condizioni',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return <LegalPage type="terms" />;
}
