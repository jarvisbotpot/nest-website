import { buildSectionMetadata, SectionLandingPage } from '../seo/SectionLandingPage';
import { sections } from '../seo/sections';

const section = sections['come-funziona'];

export const metadata = buildSectionMetadata(section);

export default function ComeFunzionaPage() {
  return <SectionLandingPage section={section} targetId="funziona" />;
}
