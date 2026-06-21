import { buildSectionMetadata, SectionLandingPage } from '../seo/SectionLandingPage';
import { sections } from '../seo/sections';

const section = sections.trainer;

export const metadata = buildSectionMetadata(section);

export default function TrainerPage() {
  return <SectionLandingPage section={section} targetId="trainer" />;
}
