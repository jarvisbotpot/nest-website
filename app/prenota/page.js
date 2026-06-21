import { buildSectionMetadata, SectionLandingPage } from '../seo/SectionLandingPage';
import { sections } from '../seo/sections';

const section = sections.prenota;

export const metadata = buildSectionMetadata(section);

export default function PrenotaPage() {
  return <SectionLandingPage section={section} targetId="prenotazione" />;
}
