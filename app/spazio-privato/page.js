import { buildSectionMetadata, SectionLandingPage } from '../seo/SectionLandingPage';
import { sections } from '../seo/sections';

const section = sections['spazio-privato'];

export const metadata = buildSectionMetadata(section);

export default function SpazioPrivatoPage() {
  return <SectionLandingPage section={section} targetId="cosa" />;
}
