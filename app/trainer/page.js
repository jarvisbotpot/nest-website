import { buildSectionMetadata, SectionPage } from '../seo/SectionPage';
import { sections } from '../seo/sections';

const section = sections.trainer;

export const metadata = buildSectionMetadata(section);

export default function TrainerPage() {
  return <SectionPage section={section} />;
}
