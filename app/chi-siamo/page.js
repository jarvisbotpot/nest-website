import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Cos e NEST',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ChiSiamoPage() {
  redirect('/spazio-privato/');
}
