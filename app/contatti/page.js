import { buildSectionMetadata, SectionPage } from '../seo/SectionPage';
import { sections } from '../seo/sections';

const section = sections.contatti;

export const metadata = buildSectionMetadata(section);

export default function ContattiPage() {
  return <SectionPage section={section} />;
}
