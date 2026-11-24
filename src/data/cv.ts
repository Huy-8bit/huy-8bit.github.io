// Profile, experience, expertise and education.
//
// Source of truth: the CV ("Nguyen Gia Huy CV.pdf", October 2026 version). Nothing here goes beyond it.
// Deliberate omissions, kept from earlier edits of this site:
//   - The phone number is not published.
//   - Galaxy FinX stays at the level of "Vault Core and smart contracts": no product-level details,
//     no T24 and no internal figures.
//   - DattingQ is not listed.
// Project facts live in ./projects.ts and come from each project's own repository.

export const profile = {
  name: 'Nguyen Gia Huy',
  role: 'Software Engineer',
  focus: ['Backend engineering', 'Distributed systems', 'Databases', 'Infrastructure'],
  email: 'johnnynguyen882@gmail.com',
  github: 'https://github.com/Huy-8bit',
  linkedin: 'https://www.linkedin.com/in/huy8bit',
  source: 'https://github.com/Huy-8bit/huy-8bit.github.io',
  statement: 'I build backend systems, and tools that make complex systems easier to understand and troubleshoot.',
  intro:
    'I work on backend services, distributed systems, databases and cloud infrastructure, currently in core banking. Outside work I build open-source tools for PostgreSQL observability and Redis caching.',
};

export type Role = {
  company: string;
  org?: string;
  title: string;
  start: string;
  end: string;
  /** ISO dates for <time datetime>. */
  startISO: string;
  endISO?: string;
  domain: string;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: 'Galaxy FinX',
    org: 'Vikki Digital Bank',
    title: 'Software Engineer',
    start: 'Mar 2026',
    end: 'Present',
    startISO: '2026-03',
    domain: 'Core banking on Thought Machine Vault Core',
    points: ['Develop smart contracts and banking products on Thought Machine Vault Core.', 'Build the tooling used to test and deploy them.'],
    stack: ['Vault Core', 'Smart contracts'],
  },
  {
    company: 'Vietlink',
    org: 'KDDI Agile Development Center Group',
    title: 'Software Engineer',
    start: 'Apr 2025',
    end: 'Mar 2026',
    startISO: '2025-04',
    endISO: '2026-03',
    domain: 'Data pipelines for au でんき, an electric utility platform',
    points: [
      'Designed, built and operated ETL pipelines on AWS (Lambda, ECS, RDS, S3, Athena) that process utility data for analytics and operational workloads.',
      'Redesigned batch workflows with parallel execution and more efficient data access, raising processing throughput by 150%.',
      'Migrated search and analytics from Elasticsearch to OpenSearch, reworking how data is ingested and indexed.',
      'Maintained the infrastructure with Terraform and AWS SAM, and monitored pipeline health and failures with CloudWatch and Datadog.',
    ],
    stack: ['AWS', 'OpenSearch', 'Terraform', 'AWS SAM', 'CloudWatch', 'Datadog'],
  },
  {
    company: 'VNPAY',
    title: 'Software Engineer',
    start: 'Jan 2024',
    end: 'Apr 2025',
    startISO: '2024-01',
    endISO: '2025-04',
    domain: 'VNPAY Cloud, a private cloud platform for fintech and enterprise customers',
    points: [
      'Designed and operated the platform on OpenStack and Cluster API, with automated provisioning, scaling and zero-downtime upgrades for 50+ production Kubernetes clusters.',
      'Implemented multi-tenant authentication and authorization with Keycloak and role-based access control, isolating 20+ customer organizations.',
      'Integrated and operated Kong Gateway for 100+ microservices, with service-level and network-level access control.',
      'Automated about 80% of data-center provisioning and infrastructure configuration.',
    ],
    stack: ['OpenStack', 'Cluster API', 'Kubernetes', 'Keycloak', 'Kong'],
  },
  {
    company: 'EsolLabs',
    title: 'Blockchain Developer',
    start: 'Jun 2023',
    end: 'Sep 2023',
    startISO: '2023-06',
    endISO: '2023-09',
    domain: 'A cross-chain NFT and token platform',
    points: [
      'Developed and reviewed 15+ smart contracts for DeFi and NFT use cases in Solidity and Move.',
      'Built event-driven services that capture on-chain events and sync them into off-chain databases and APIs.',
      'Integrated backend services with 5+ blockchain networks, including Ethereum, BSC, Polygon, Aptos and Sui.',
    ],
    stack: ['Solidity', 'Move', 'Event-driven services'],
  },
];

export type Expertise = {
  area: string;
  /** The kind of problems this covers, in one line. */
  about: string;
  tools: string[];
  /** Where this has been used, only where the CV or a repository shows it. */
  evidence: { label: string; href?: string }[];
};

export const expertise: Expertise[] = [
  {
    area: 'Languages and backend',
    about: 'Services, APIs and command-line tools.',
    tools: ['Go', 'Python', 'Java', 'gRPC', 'REST', 'Spring Boot', 'FastAPI'],
    evidence: [
      { label: 'LockLens (Go)', href: '#locklens' },
      { label: 'KeyShift (Go)', href: '#keyshift' },
    ],
  },
  {
    area: 'Databases and caching',
    about: 'Relational, document, search and cache stores, and how to observe them.',
    tools: ['PostgreSQL', 'TimescaleDB', 'Redis', 'MongoDB', 'OpenSearch', 'Elasticsearch', 'ClickHouse'],
    evidence: [
      { label: 'LockLens (PostgreSQL)', href: '#locklens' },
      { label: 'KeyShift (Redis)', href: '#keyshift' },
      { label: 'OpenSearch migration at Vietlink', href: '#experience' },
    ],
  },
  {
    area: 'Distributed systems and messaging',
    about: 'Event-driven services, queues, and coordination across many instances.',
    tools: ['Kafka', 'RabbitMQ', 'Event-driven architecture'],
    evidence: [
      { label: 'On-chain event services at EsolLabs', href: '#experience' },
      { label: 'KeyShift fleet controller', href: '#keyshift' },
    ],
  },
  {
    area: 'Cloud and infrastructure',
    about: 'Private and public cloud, Kubernetes, and infrastructure as code.',
    tools: ['AWS', 'Kubernetes', 'OpenStack', 'Docker', 'Terraform', 'Consul', 'Vault'],
    evidence: [
      { label: 'VNPAY Cloud', href: '#experience' },
      { label: 'AWS data pipelines at Vietlink', href: '#experience' },
    ],
  },
  {
    area: 'Observability and reliability',
    about: 'Metrics, traces, logs and dashboards, and acting on what they show.',
    tools: ['OpenTelemetry', 'Prometheus', 'Grafana', 'ELK', 'CloudWatch', 'Datadog'],
    evidence: [
      { label: 'LockLens', href: '#locklens' },
      { label: 'KeyShift dashboards', href: '#keyshift' },
      { label: 'Pipeline monitoring at Vietlink', href: '#experience' },
    ],
  },
  {
    area: 'Core banking',
    about: 'Banking products built as smart contracts on a core banking platform.',
    tools: ['Thought Machine Vault Core', 'Smart contracts'],
    evidence: [{ label: 'Galaxy FinX', href: '#experience' }],
  },
  {
    area: 'Delivery',
    about: 'Build, test and deployment pipelines.',
    tools: ['Git', 'GitHub Actions', 'Jenkins', 'ArgoCD'],
    evidence: [{ label: 'CI for LockLens and KeyShift', href: '#work' }],
  },
];

export const education: { title: string; detail: string; kind: 'Degree' | 'Certificate' }[] = [
  { title: 'University of Science, Ho Chi Minh City', detail: 'B.Sc. Information Technology, Knowledge Engineering', kind: 'Degree' },
  { title: 'DevOps on AWS Specialization', detail: 'Coursera', kind: 'Certificate' },
];

/** Section links. "Writing" is added by the header only when published articles exist. */
export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];
