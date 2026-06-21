import { buildSectionMetadata, SectionLandingPage } from '../seo/SectionLandingPage';
import { sections } from '../seo/sections';

const section = sections['gift-card'];

export const metadata = buildSectionMetadata(section);

export default function GiftCardPage() {
  return <SectionLandingPage section={section} targetId="giftcard" />;
}
