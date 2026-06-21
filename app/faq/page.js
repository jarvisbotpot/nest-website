import { buildSectionMetadata, SectionPage } from '../seo/SectionPage';
import { sections } from '../seo/sections';

const section = sections.faq;

export const metadata = buildSectionMetadata(section);

export default function FaqPage() {
  return <SectionPage section={section} />;
}
