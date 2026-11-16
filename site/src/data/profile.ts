// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC PROFILE DATA
//
// Everything here is public. Describe skills and outcomes, never internals.
// Do NOT add:
//   - an employer's security tooling or vendor stack (it hands attackers a map)
//   - team size, team locations, or colleague names
//   - specific incidents, audit firms, or acquisition deal details
//   - performance review ratings or job-search details
//   - personal email, phone, street address, or former names
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Rachel Coleman',
  headline: 'Security Leader',
  focus: ['SOC Builder', 'Incident Commander', 'Security Operations'],
  location: 'Salt Lake City, UT',
  summary: [
    'Security leader and SOC builder. I’ve stood up security operations from scratch twice, and served as senior incident commander from analyst through manager.',
    'Hands-on technical work comes first, and working with people runs through all of it: engineers, auditors, customers, newly acquired teams, and women just getting started in security.',
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/pakhet',
    github: 'https://github.com/pakhet',
  },
};

export const stats = [
  { value: '2×', label: 'SOCs built from scratch' },
  { value: 'IC', label: 'Senior incident commander, analyst → manager' },
  { value: '10+', label: 'Pentests coordinated per cycle' },
  { value: '2015', label: 'Organizing in the security community since' },
];

export type Role = {
  title: string;
  start: string;
  end: string;
  note?: string;
  highlights?: string[];
};
export type Job = {
  org: string;
  location: string;
  start: string;
  end: string;
  roles: Role[];
};

export const experience: Job[] = [
  {
    org: 'PDQ',
    location: 'Salt Lake City, UT',
    start: 'Sep 2022',
    end: 'Present',
    roles: [
      {
        title: 'Security Manager',
        start: 'May 2026',
        end: 'Present',
        highlights: [
          'Led a distributed, international security team covering security operations and application security.',
          'Built the team’s operating rhythm: 1:1s, standups, OKR planning, and the on-call rotation. Delegated red team work and investigations to grow the team.',
          'Brought AI into security workflows to speed up customer security reviews, and set the guardrails for adopting new AI tools safely.',
        ],
      },
      {
        title: 'Security Team Lead',
        start: 'Jan 2026',
        end: 'Apr 2026',
        highlights: [
          'Ran the company’s largest penetration testing program to date.',
          'Onboarded new hires and built out the team.',
        ],
      },
      {
        title: 'Senior Security Analyst',
        start: 'Sep 2022',
        end: 'Dec 2025',
        highlights: [
          'Hired to build the SOC from scratch, then restructured it: security awareness, vulnerability management, EDR, monitoring, and MDR.',
          'Senior incident commander. Led threat hunting, investigations, and detection engineering in KQL.',
          'Ran the penetration testing program, and took the bug bounty program public, working between researchers and engineers.',
          'Helped Engineering stand up its application security program, and partnered with DevOps on cloud and Kubernetes security.',
          'Supported SOC 2 Type 1 and Type 2, ISO 27001, and GDPR: owned security policies, gathered evidence, and worked with auditors.',
          'Built the public trust center, and answered customer security questions on calls, webinars, and community channels.',
          'Helped bring an acquired company’s people and systems in securely, and helped hire and grow the security team.',
        ],
      },
    ],
  },
  {
    org: 'Revver',
    location: 'Lehi, UT',
    start: 'Sep 2021',
    end: 'Aug 2022',
    roles: [
      {
        title: 'Security Analyst',
        start: 'Sep 2021',
        end: 'Aug 2022',
        highlights: [
          'Hired to build the SOC and NOC from the ground up: security awareness, vulnerability management, EDR, product monitoring, and MDR.',
          'Built Datadog monitoring and security capabilities from scratch, cost control included, and ran Azure Sentinel.',
          'Secured 3 products across 4 AWS and Azure regions. Owned Tier 3 operations and change management.',
        ],
      },
    ],
  },
  {
    org: 'DigiCert',
    location: 'Lehi, UT',
    start: 'May 2020',
    end: 'Sep 2021',
    roles: [
      {
        title: 'Technical Support Analyst',
        start: 'May 2020',
        end: 'Sep 2021',
        highlights: [
          'Worked with customers on TLS and code signing certificates: issuance validation, troubleshooting, and best-practice advice.',
        ],
      },
    ],
  },
  {
    org: 'Arctic Wolf Networks',
    location: 'Provo, UT',
    start: 'Dec 2019',
    end: 'Feb 2020',
    roles: [
      {
        title: 'Concierge Security Analyst I',
        start: 'Dec 2019',
        end: 'Feb 2020',
        highlights: [
          'Tier 1 SOC analyst for thousands of customers: took incoming calls and managed cases including ransomware, phishing, and evasion attempts.',
        ],
      },
    ],
  },
  {
    org: 'Zions Bancorporation',
    location: 'Salt Lake City, UT',
    start: '2018',
    end: '2019',
    roles: [
      {
        title: 'InfoSec Controls Management & Risk Assessment Intern',
        start: '2018',
        end: '2019',
        highlights: ['Compliance audits and control testing. Automated parts of the testing in Python and SQL.'],
      },
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Security operations',
    items: ['Incident command', 'Threat hunting', 'Detection engineering (KQL)', 'SIEM', 'EDR / MDR', 'Vulnerability management', 'DLP'],
  },
  {
    group: 'Offensive & AppSec',
    items: ['Pentest program management', 'Bug bounty programs', 'Application security'],
  },
  {
    group: 'GRC',
    items: ['SOC 2', 'ISO 27001', 'GDPR', 'MITRE ATT&CK', 'NIST & CMMC (working knowledge)'],
  },
  {
    group: 'Cloud & infrastructure',
    items: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'Python', 'SQL'],
  },
  {
    group: 'Leadership',
    items: ['Hiring & onboarding', 'Coaching', 'OKR planning', 'On-call management', 'AI security governance'],
  },
];

export const community = {
  org: 'Utah Open Source Foundation',
  title: 'Project Manager',
  start: '2015',
  end: 'Present',
  points: [
    'Founded the BYU Linux Club and organized Install Fests',
    'Ran an intercollegiate Capture the Flag at Utah Open West',
    'Mentors women getting into security through SheTech',
    'Conference core team relaunching Utah Open West',
  ],
};

export const education = {
  school: 'Western Governors University',
  degree: 'B.S., Cybersecurity and Information Assurance',
  years: '2023',
};

export const certifications = ['ITIL Foundation (2021)'];
