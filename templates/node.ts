import type { Project } from '@stackblitz/sdk';

const INDEX_JS = `
import { say } from 'cowsay';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

const examples = [
  format(new Date(), "'Today is a' eeee"),
  formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true }),
  formatRelative(subDays(new Date(), 3), new Date()),
];

for (const example of examples) {
  console.log(say({ text: example }));
}
`;

const PACKAGE_JSON = `
{
  "name": "stackblitz-sdk-demo",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "cowsay": "1.5.0",
    "date-fns": "2.28.0"
  }
}
`;

export const nodeProject: Project = {
  title: 'Dynamically Generated Project',
  description: 'Simple example using the WebContainers "node" template.',
  template: 'node',
  files: {
    'index.js': INDEX_JS,
    'package.json': PACKAGE_JSON,
  },
};
