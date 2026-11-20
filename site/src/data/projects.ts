// Each project gets a tab on /projects and its own page at /projects/<slug>.
// Keep details out until a project is actually built.
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: 'live' | 'in-progress' | 'planned';
  url?: string;
  stack?: string[];
  description?: string[];
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: 'incident-radar',
    name: 'Incident Radar',
    tagline: 'Early warning for major security events: the next Log4Shell, as it breaks.',
    status: 'live',
    url: 'https://pakhet-radar.web.app',
    repo: 'https://github.com/pakhet/incident-radar',
    stack: ['Python', 'Cloud Run', 'Cloud Scheduler', 'Firestore', 'Terraform', 'GitHub Actions', 'Astro'],
    description: [
      'Every 15 minutes, Incident Radar pulls from CISA’s Known Exploited Vulnerabilities catalog, NVD, GitHub advisories, FIRST EPSS, vendor PSIRTs, and the security press. It groups reports about the same event into one incident, and scores it with a transparent formula where every point is shown.',
      'When something big breaks, it pushes an alert to my phone. Anyone can follow along on the public dashboard or subscribe anonymously through the Atom feed.',
      'It runs on serverless, scale-to-zero GCP in its own isolated project, deploys through a keyless, signed CI/CD pipeline, and costs about nothing to operate.',
    ],
  },
];

export const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  'in-progress': 'Under construction',
  planned: 'Planned',
};
