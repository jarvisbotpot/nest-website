import { buildSectionMetadata, SectionPage } from '../seo/SectionPage';
import { sections } from '../seo/sections';

const section = sections['come-funziona'];

export const metadata = buildSectionMetadata(section);

export default function ComeFunzionaPage() {
  return <SectionPage section={section} />;
}
