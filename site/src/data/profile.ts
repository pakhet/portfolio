// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC PROFILE DATA
//
// Rule for this file: nothing goes here that is not already public on LinkedIn.
// In particular, do NOT add:
//   - an employer's security tooling or vendor stack (it hands attackers a map)
//   - team size, team locations, or colleague names
//   - details of specific incidents, audits in progress, or internal programs
//   - performance review ratings or job-search details
//   - personal email, phone, or street address
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Rachel Coleman',
  headline: 'Security Manager',
  focus: ['Security Operations', 'Incident Response', 'Cloud Security'],
  location: 'Salt Lake City, UT',
  summary: [
    'I lead security operations and incident response, building the cloud and operational security programs that keep organizations resilient.',
    'Outside of work I invest in the security community — organizing capture-the-flag events and open source conferences, and mentoring emerging professionals, particularly women entering the field.',
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/pakhet',
    github: 'https://github.com/pakhet',
  },
};

export type Role = { title: string; start: string; end: string };
export type Job = {
  org: string;
  location: string;
  roles: Role[];
  blurb?: string;
  tags?: string[];
};

export const experience: Job[] = [
  {
    org: 'PDQ',
    location: 'Salt Lake City, UT',
    roles: [
      { title: 'Security Manager', start: 'May 2026', end: 'Present' },
      { title: 'Security Team Lead', start: 'Jan 2026', end: 'Apr 2026' },
      { title: 'Senior Security Analyst', start: 'Sep 2022', end: 'Dec 2025' },
    ],
    blurb:
      'Leadership in security operations and incident response, ensuring robust cloud and operational security across the organization.',
    tags: ['Security Operations', 'Incident Response', 'Cloud Security', 'Leadership'],
  },
  {
    org: 'Revver',
    location: 'Lehi, UT',
    roles: [{ title: 'Security Analyst', start: 'Sep 2021', end: 'Aug 2022' }],
    blurb:
      'Co-ran the SOC/NOC, tier 3 operations, and change management. Worked with DevOps and engineering to secure and maintain three products across four AWS and Azure regions. Deployed, tuned, and maintained DataDog and Azure Sentinel from scratch.',
    tags: ['SOC/NOC', 'AWS', 'Azure', 'DataDog', 'Azure Sentinel'],
  },
  {
    org: 'DigiCert',
    location: 'Lehi, UT',
    roles: [{ title: 'Technical Support Analyst', start: 'May 2020', end: 'Sep 2021' }],
    blurb:
      'Advised customers and partners on TLS best practices; troubleshot installation, upgrade, and network issues; validated organization and domain information for certificate issuance.',
    tags: ['TLS', 'PKI'],
  },
  {
    org: 'Arctic Wolf Networks',
    location: 'Provo, UT',
    roles: [{ title: 'Concierge Security Analyst I', start: 'Dec 2019', end: 'Feb 2020' }],
    blurb:
      'Triaged security incidents for thousands of customers in the ISOC, including ransomware, phishing, and evasion attempts.',
    tags: ['SOC', 'Triage'],
  },
  {
    org: 'Zions Bancorporation',
    location: 'West Valley City, UT',
    roles: [
      { title: 'InfoSec Controls Management Intern', start: 'May 2019', end: 'Oct 2019' },
      { title: 'InfoSec Risk Assessment Intern', start: 'Jun 2018', end: 'Aug 2018' },
    ],
    blurb:
      'Assessed systems against industry compliance standards and automated compliance tests in Python and SQL; cleared the policy-exception backlog.',
    tags: ['Compliance', 'Python', 'SQL'],
  },
];

export const community = {
  org: 'Utah Open Source Foundation',
  title: 'Project Manager',
  start: 'Aug 2015',
  end: 'Present',
  points: [
    'Founded the BYU Linux Club and organized Install Fests',
    'Coordinated the Intercollegiate Capture the Flag at Utah Open West',
    'Volunteer at SheTech, mentoring women entering cybersecurity',
    'Conference core team relaunching Utah Open West',
  ],
};

export const education = {
  school: 'Western Governors University',
  degree: 'B.S., Cybersecurity and Information Assurance',
  years: '2021 – 2023',
};

// LinkedIn's summary also mentions ITIL and AWS certifications. Add them here
// only once you've confirmed they are current.
export const certifications = ['CompTIA PenTest+ ce'];

export const skills = [
  'Security Operations',
  'Incident Response',
  'Cloud Security (AWS, Azure)',
  'SIEM & Monitoring',
  'Project Management',
  'Mentoring',
  'Python',
  'SQL',
];
