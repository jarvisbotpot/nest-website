import { buildSectionMetadata, SectionLandingPage } from '../seo/SectionLandingPage';
import { sections } from '../seo/sections';

const section = sections.contatti;

export const metadata = buildSectionMetadata(section);

export default function ContattiPage() {
  return <SectionLandingPage section={section} targetId="contatti" />;
}
