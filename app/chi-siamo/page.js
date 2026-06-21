import { buildSectionMetadata, SectionLandingPage } from '../seo/SectionLandingPage';
import { sections } from '../seo/sections';

const section = sections['chi-siamo'];

export const metadata = buildSectionMetadata(section);

export default function ChiSiamoPage() {
  return <SectionLandingPage section={section} targetId="chisiamo" />;
}
