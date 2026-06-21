import { buildSectionMetadata, SectionPage } from '../seo/SectionPage';
import { sections } from '../seo/sections';

const section = sections.prenota;

export const metadata = buildSectionMetadata(section);

export default function PrenotaPage() {
  return <SectionPage section={section} />;
}
