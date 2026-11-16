// Each project gets a tab on /projects and its own page at /projects/<slug>.
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: 'live' | 'in-progress' | 'planned';
  stack: string[];
  description: string[];
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: 'incident-radar',
    name: 'Incident Radar',
    tagline: 'Real-time alerting for major security events — the next Log4Shell, as it breaks.',
    status: 'in-progress',
    stack: ['Cloud Run Jobs', 'Cloud Scheduler', 'Firestore', 'CISA KEV', 'NVD API'],
    description: [
      'When a vulnerability like Log4Shell or Spring4Shell drops, the first hours matter. Incident Radar watches authoritative sources — CISA’s Known Exploited Vulnerabilities catalog, NVD, vendor advisories, and security news — scores what it finds, and pushes alerts to subscribers when something big is happening.',
      'It runs entirely on serverless, scale-to-zero GCP services, so it costs pennies a month while idle.',
    ],
  },
];

export const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  'in-progress': 'In progress',
  planned: 'Planned',
};
