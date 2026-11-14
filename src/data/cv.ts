// Site content. Every fact comes from the CV ("Nguyen Gia Huy CV.pdf"); edit here to update the page.
// The phone number is deliberately left off the public site.

export const profile = {
  name: 'Nguyen Gia Huy',
  role: 'Software Engineer',
  email: 'johnnynguyen882@gmail.com',
  github: 'https://github.com/Huy-8bit',
  linkedin: 'https://www.linkedin.com/in/huy8bit',
  headline: ['Software Engineer,', 'focused on backend systems.'],
  intro:
    'I work with backend services, distributed systems, databases, and cloud infrastructure, with experience building systems for banking and data platforms.',
};

export type IconName =
  | 'code'
  | 'database'
  | 'network'
  | 'cloud'
  | 'activity'
  | 'bank'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'menu'
  | 'close'
  | 'cap'
  | 'award';

export const skills: { title: string; summary: string; icon: IconName; items: string[] }[] = [
  {
    title: 'Backend Engineering',
    summary: 'Services and APIs, mostly in Go and Python.',
    icon: 'code',
    items: ['Go', 'Python', 'Java', 'REST', 'gRPC'],
  },
  {
    title: 'Databases & Storage',
    summary: 'Relational, document, cache and search stores.',
    icon: 'database',
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'OpenSearch', 'ClickHouse'],
  },
  {
    title: 'Distributed Systems',
    summary: 'Messaging and event-driven services.',
    icon: 'network',
    items: ['Kafka', 'RabbitMQ', 'Event-driven architecture'],
  },
  {
    title: 'Cloud & Infrastructure',
    summary: 'Running workloads on AWS and private cloud.',
    icon: 'cloud',
    items: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'OpenStack'],
  },
  {
    title: 'Observability',
    summary: 'Metrics, traces and dashboards.',
    icon: 'activity',
    items: ['OpenTelemetry', 'Prometheus', 'Grafana'],
  },
  {
    title: 'Core Banking',
    summary: 'Lending products and batch operations.',
    icon: 'bank',
    items: ['Vault Core', 'Temenos T24'],
  },
];

export const featured = {
  name: 'LockLens',
  label: 'Open source',
  summary: 'Open-source PostgreSQL monitoring and incident investigation.',
  detail:
    'Read-only collectors and a rule engine find blocking chains, long transactions and query regressions, and keep the evidence for each incident.',
  stack: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'TimescaleDB'],
  website: 'https://huy-8bit.github.io/locklens-site/',
  source: 'https://github.com/Huy-8bit/locklens',
};

export const projects: { name: string; label: string; summary: string; stack: string[] }[] = [
  {
    name: 'DattingQ',
    label: 'Dating platform',
    summary: 'Backend services on gRPC-Gateway, Kafka, MongoDB and Redis, with multi-cluster failover and OpenTelemetry-based observability.',
    stack: ['gRPC', 'Kafka', 'MongoDB', 'Redis'],
  },
  {
    name: 'MeetQ',
    label: 'Online meetings',
    summary: 'A real-time meeting platform on LiveKit with live transcription, voice translation and meeting summaries using OpenAI models.',
    stack: ['LiveKit', 'OpenAI', 'Real-time'],
  },
];

export type Role = {
  company: string;
  org?: string;
  title: string;
  start: string;
  end: string;
  focus: string;
  summary: string;
};

export const experience: Role[] = [
  {
    company: 'Galaxy FinX',
    org: 'Vikki Digital Bank',
    title: 'Software Engineer, Core Banking',
    start: 'Mar 2026',
    end: 'Present',
    focus: 'Core banking · Backend',
    summary:
      'Build lending and overdraft products on Thought Machine Vault Core and integrate the platform with backend services. Rebuilt the simulation-testing framework in Go, set up the AWS deployment pipeline, and work on the migration to Temenos T24.',
  },
  {
    company: 'Vietlink',
    org: 'KDDI Agile Development Center Group',
    title: 'Software Engineer',
    start: 'Apr 2025',
    end: 'Mar 2026',
    focus: 'AWS data pipelines · Data engineering',
    summary:
      'Built and operated ETL pipelines on AWS (Lambda, ECS, S3, Athena) for au でんき, an electric utility platform. Migrated search and analytics from Elasticsearch to OpenSearch and managed the infrastructure with Terraform.',
  },
  {
    company: 'VNPAY',
    title: 'Software Engineer',
    start: 'Jan 2024',
    end: 'Apr 2025',
    focus: 'Kubernetes · Cloud infrastructure',
    summary:
      'Worked on VNPAY Cloud, a private cloud on OpenStack and Cluster API that runs production Kubernetes clusters. Implemented multi-tenant access control with Keycloak and operated Kong Gateway for the service ecosystem.',
  },
  {
    company: 'EsolLabs',
    title: 'Blockchain Developer',
    start: 'Jun 2023',
    end: 'Sep 2023',
    focus: 'Smart contracts · Event-driven backend',
    summary: 'Wrote Solidity and Move smart contracts, and event-driven services that sync on-chain events into off-chain databases and APIs.',
  },
];

export const education: { title: string; detail: string; icon: IconName }[] = [
  { title: 'University of Science, Ho Chi Minh City', detail: 'B.Sc. Information Technology — Knowledge Engineering', icon: 'cap' },
  { title: 'DevOps on AWS Specialization', detail: 'Coursera — Certificate', icon: 'award' },
];

export const nav = [
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];
