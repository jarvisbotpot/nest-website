import { buildSectionMetadata, SectionLandingPage } from '../seo/SectionLandingPage';
import { sections } from '../seo/sections';

const section = sections.faq;

export const metadata = buildSectionMetadata(section);

export default function FaqPage() {
  return <SectionLandingPage section={section} targetId="faq" />;
}
