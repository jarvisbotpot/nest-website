import { buildSectionMetadata, SectionPage } from '../seo/SectionPage';
import { sections } from '../seo/sections';

const section = sections['gift-card'];

export const metadata = buildSectionMetadata(section);

export default function GiftCardPage() {
  return <SectionPage section={section} />;
}
