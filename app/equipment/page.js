import { buildSectionMetadata, SectionLandingPage } from '../seo/SectionLandingPage';
import { sections } from '../seo/sections';

const section = sections.equipment;

export const metadata = buildSectionMetadata(section);

export default function EquipmentPage() {
  return <SectionLandingPage section={section} targetId="equipment" />;
}
