import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export default function HomePage() {
  const html = readFileSync(join(process.cwd(), 'content/home.html'), 'utf8');

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
