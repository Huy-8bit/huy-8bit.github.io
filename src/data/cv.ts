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
  statement: 'I’m Huy, a software engineer who likes figuring out how things work, especially when they don’t.',
  intro:
    'At Galaxy FinX, I work on core banking. Outside work, I build projects such as a PostgreSQL monitoring tool and a Redis caching SDK.',
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
  /** Figures from the CV, shown as highlights. Galaxy FinX deliberately has none. */
  metrics?: { value: number; prefix?: string; suffix?: string; label: string }[];
};

export const experience: Role[] = [
  {
    company: 'Galaxy FinX',
    org: 'Vikki Digital Bank',
    title: 'Software Engineer',
    start: 'Mar 2026',
    end: 'Present',
    startISO: '2026-03',
    domain: 'Core banking with Thought Machine Vault Core',
    points: ['Develop smart contracts and banking products on Vault Core.', 'Build the tools used to test and deploy them.'],
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
    domain: 'Data engineering for au でんき, an electric utility platform',
    points: [
      'Built and operated ETL pipelines on AWS, processing utility data for analytics and day-to-day operations.',
      'Reworked batch jobs to run in parallel and access data more efficiently, increasing throughput by 150%.',
      'Moved search and analytics from Elasticsearch to OpenSearch, updating the ingestion and indexing workflows along the way.',
      'Maintained infrastructure with Terraform and AWS SAM, and used CloudWatch and Datadog to monitor the pipelines.',
    ],
    stack: ['AWS', 'OpenSearch', 'Terraform', 'AWS SAM', 'CloudWatch', 'Datadog'],
    metrics: [{ value: 150, prefix: '+', suffix: '%', label: 'batch throughput after redesign' }],
  },
  {
    company: 'VNPAY',
    title: 'Software Engineer',
    start: 'Jan 2024',
    end: 'Apr 2025',
    startISO: '2024-01',
    endISO: '2025-04',
    domain: 'VNPAY Cloud, a private cloud for fintech and enterprise customers',
    points: [
      'Designed and operated an OpenStack and Cluster API platform, automating provisioning, scaling and zero-downtime upgrades for 50+ production Kubernetes clusters.',
      'Set up multi-tenant authentication and role-based access control with Keycloak, keeping 20+ customer organizations isolated.',
      'Integrated and operated Kong Gateway across 100+ microservices, with service- and network-level access controls.',
      'Automated around 80% of data center provisioning and infrastructure configuration.',
    ],
    stack: ['OpenStack', 'Cluster API', 'Kubernetes', 'Keycloak', 'Kong'],
    metrics: [
      { value: 50, suffix: '+', label: 'production Kubernetes clusters' },
      { value: 20, suffix: '+', label: 'isolated customer organizations' },
      { value: 100, suffix: '+', label: 'microservices behind Kong' },
      { value: 80, prefix: '~', suffix: '%', label: 'of provisioning and configuration automated' },
    ],
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
      'Developed and reviewed 15+ DeFi and NFT smart contracts in Solidity and Move.',
      'Built event-driven services that capture on-chain activity and sync it to off-chain databases and APIs.',
      'Connected backend services to 5+ blockchain networks, including Ethereum, BSC, Polygon, Aptos and Sui.',
    ],
    stack: ['Solidity', 'Move', 'Event-driven services'],
    metrics: [
      { value: 15, suffix: '+', label: 'smart contracts developed and reviewed' },
      { value: 5, suffix: '+', label: 'blockchain networks integrated' },
    ],
  },
];

export type Expertise = {
  area: string;
  tone: 'indigo' | 'cyan' | 'violet' | 'blue' | 'emerald' | 'warm' | 'pink';
  glyph: 'code' | 'db' | 'mesh' | 'cloud' | 'pulse' | 'bank' | 'pipe';
  /** The kind of problems this covers, in one line. */
  about: string;
  tools: string[];
  /** Where this has been used, only where the CV or a repository shows it. */
  evidence: { label: string; href?: string }[];
};

export const expertise: Expertise[] = [
  {
    area: 'Backend engineering',
    tone: 'indigo',
    glyph: 'code',
    about: 'Building services, APIs and command-line tools.',
    tools: ['Go', 'Python', 'Java', 'gRPC', 'REST', 'Spring Boot', 'FastAPI'],
    evidence: [
      { label: 'LockLens (Go)', href: '#locklens' },
      { label: 'KeyShift (Go)', href: '#keyshift' },
    ],
  },
  {
    area: 'Database and caching',
    tone: 'cyan',
    glyph: 'db',
    about: 'Working with databases, search, caching and monitoring.',
    tools: ['PostgreSQL', 'TimescaleDB', 'Redis', 'MongoDB', 'OpenSearch', 'Elasticsearch', 'ClickHouse'],
    evidence: [
      { label: 'LockLens (PostgreSQL)', href: '#locklens' },
      { label: 'KeyShift (Redis)', href: '#keyshift' },
      { label: 'OpenSearch migration at Vietlink', href: '#experience' },
    ],
  },
  {
    area: 'Distributed systems',
    tone: 'violet',
    glyph: 'mesh',
    about: 'Connecting services through events, queues and shared coordination.',
    tools: ['Kafka', 'RabbitMQ', 'Event-driven architecture'],
    evidence: [
      { label: 'On-chain event services at EsolLabs', href: '#experience' },
      { label: 'KeyShift fleet controller', href: '#keyshift' },
    ],
  },
  {
    area: 'Cloud infrastructure',
    tone: 'blue',
    glyph: 'cloud',
    about: 'Running workloads on public and private clouds with Kubernetes and infrastructure as code.',
    tools: ['AWS', 'Kubernetes', 'OpenStack', 'Docker', 'Terraform', 'Consul', 'Vault'],
    evidence: [
      { label: 'VNPAY Cloud', href: '#experience' },
      { label: 'AWS data pipelines at Vietlink', href: '#experience' },
    ],
  },
  {
    area: 'Observability',
    tone: 'emerald',
    glyph: 'pulse',
    about: 'Finding and investigating problems with metrics, traces and logs.',
    tools: ['OpenTelemetry', 'Prometheus', 'Grafana', 'ELK', 'CloudWatch', 'Datadog'],
    evidence: [
      { label: 'LockLens', href: '#locklens' },
      { label: 'KeyShift dashboards', href: '#keyshift' },
      { label: 'Pipeline monitoring at Vietlink', href: '#experience' },
    ],
  },
  {
    area: 'Core banking',
    tone: 'warm',
    glyph: 'bank',
    about: 'Developing banking products as smart contracts on Vault Core.',
    tools: ['Thought Machine Vault Core', 'Smart contracts'],
    evidence: [{ label: 'Galaxy FinX', href: '#experience' }],
  },
  {
    area: 'Software delivery',
    tone: 'pink',
    glyph: 'pipe',
    about: 'Automating builds, tests and deployments.',
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
