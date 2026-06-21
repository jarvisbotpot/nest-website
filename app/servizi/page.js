import { buildSectionMetadata, SectionPage } from '../seo/SectionPage';
import { sections } from '../seo/sections';

const section = sections.servizi;

export const metadata = buildSectionMetadata(section);

export default function ServiziPage() {
  return <SectionPage section={section} />;
}
