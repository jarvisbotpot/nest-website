import { buildSectionMetadata, SectionLandingPage } from '../seo/SectionLandingPage';
import { sections } from '../seo/sections';

const section = sections.servizi;

export const metadata = buildSectionMetadata(section);

export default function ServiziPage() {
  return <SectionLandingPage section={section} targetId="servizi" />;
}
