// Each project gets a tab on /projects and its own page at /projects/<slug>.
// Keep details out until a project is actually built.
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: 'live' | 'in-progress' | 'planned';
  stack?: string[];
  description?: string[];
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: 'incident-radar',
    name: 'Incident Radar',
    tagline: 'Under construction. Check back soon.',
    status: 'in-progress',
  },
];

export const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  'in-progress': 'Under construction',
  planned: 'Planned',
};
