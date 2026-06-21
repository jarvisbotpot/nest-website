import { buildSectionMetadata, SectionPage } from '../seo/SectionPage';
import { sections } from '../seo/sections';

const section = sections['spazio-privato'];

export const metadata = buildSectionMetadata(section);

export default function SpazioPrivatoPage() {
  return <SectionPage section={section} />;
}
