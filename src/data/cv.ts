// Every fact on the site comes from the CV ("Nguyen Gia Huy CV.pdf"). Edit here to update the site.
// The phone number is deliberately left out of the public page.

export const profile = {
  name: 'Nguyen Gia Huy',
  role: 'Software Engineer',
  focus: 'Core Banking',
  email: 'johnnynguyen882@gmail.com',
  github: 'https://github.com/Huy-8bit',
  linkedin: 'https://www.linkedin.com/in/huy8bit',
  lead: 'I build the systems that money and data move through: core banking products on Vault Core and T24, a private cloud running 50+ production Kubernetes clusters, and data pipelines for a utility platform serving millions of users.',
};

export const impact = [
  { value: '20×', label: 'faster simulation tests', detail: '24 min → just over 50 s, after rebuilding the framework in Go', where: 'Galaxy FinX' },
  { value: '5×', label: 'faster account migration', detail: '2.5 h → 27 min with Go on AWS ECS, Lambda and RDS', where: 'Galaxy FinX' },
  { value: '50+', label: 'production Kubernetes clusters', detail: 'Provisioned, scaled and upgraded with zero downtime on OpenStack + Cluster API', where: 'VNPAY' },
  { value: '100+', label: 'services behind one gateway', detail: 'Kong Gateway with service- and network-level access control', where: 'VNPAY' },
  { value: '+150%', label: 'pipeline throughput', detail: 'Batch workflows redesigned with parallel execution and better data access', where: 'Vietlink · KDDI' },
  { value: '99.95%', label: 'uptime with multi-cluster failover', detail: 'gRPC-Gateway, Kafka, MongoDB and Redis at up to 1.5K req/s', where: 'DattingQ' },
];

export type Role = {
  company: string;
  org?: string;
  title: string;
  start: string;
  end: string;
  product: string;
  points: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    company: 'Galaxy FinX',
    org: 'Vikki Digital Bank',
    title: 'Software Engineer, Core Banking',
    start: '03/2026',
    end: 'Present',
    product: 'Vikki Digital Bank — core banking platform on Thought Machine Vault Core and Temenos T24',
    points: [
      'Developed and maintained **Lending** and **Overdraft** products on **Vault Core**, implementing interest accrual, penalty and late-fee calculation, repayment, and settlement logic using **Python Smart Contracts**.',
      'Rebuilt the simulation testing framework entirely in **Golang**, replacing the legacy Gauge-based framework and reducing execution time from **24 minutes to just over 50 seconds (20× faster)**.',
      'Deployed a new Vault Core version on **AWS**, provisioning and integrating **EKS, RDS, ECR and ELB**, and built the **CI/CD pipeline** for automated build, test and deployment.',
      'Built an account migration system using Golang and AWS (ECS, Lambda, RDS), reducing migration time from **2.5 hours to 27 minutes (5× faster)**.',
      'Integrated Vault Core with **external backend services** to support core banking operations and transaction workflows.',
      'Participated in designing the core banking migration from **Vault Core to Temenos T24**.',
      'Operated **T24 Close of Business (COB)** batch processing and developed an **operations management system** for T24 to monitor and manage COB runs.',
      'Contributed to **OFS (Open Financial Service)** development on T24.',
    ],
    tags: ['Vault Core', 'Temenos T24', 'Python', 'Go', 'AWS EKS', 'RDS', 'CI/CD'],
  },
  {
    company: 'Vietlink',
    org: 'KDDI Agile Development Center Group',
    title: 'Software Engineer',
    start: '04/2025',
    end: '03/2026',
    product: 'auでんき — large-scale electric utility platform serving millions of users',
    points: [
      'Designed, developed and operated **ETL data pipelines** on AWS using **Lambda, ECS, RDS, S3 and Athena**, transforming and processing large-scale utility data for downstream analytics and operational workloads.',
      'Optimized batch-oriented data processing workflows, improving processing throughput by **150%** through pipeline redesign, parallel execution and more efficient data access patterns.',
      'Migrated the search and analytics platform from **Elasticsearch to OpenSearch**, redesigning data ingestion and indexing flows to improve stability, consistency and query performance.',
      'Built and maintained data-platform infrastructure using **Terraform** and **AWS SAM**, and implemented monitoring with **CloudWatch** and **DataDog** for pipeline health, failures and operational anomaly detection.',
    ],
    tags: ['AWS Lambda', 'ECS', 'S3', 'Athena', 'OpenSearch', 'Terraform', 'DataDog'],
  },
  {
    company: 'VNPAY',
    title: 'Software Engineer',
    start: '01/2024',
    end: '04/2025',
    product: 'VNPAY Cloud — cloud platform for fintech and enterprise customers',
    points: [
      'Designed and operated a private cloud platform based on **OpenStack** and **Cluster API**, enabling automated provisioning, scaling and zero-downtime upgrades for **50+ production Kubernetes clusters**.',
      'Implemented multi-tenant authentication and authorization using **Keycloak** and role-based access control, ensuring tenant isolation across **20+ customer organizations**.',
      'Integrated and operated **Kong Gateway** for a microservices ecosystem of **100+ services**, implementing service-level and network-level access controls.',
      'Automated approximately **80%** of data center provisioning and infrastructure configuration processes, significantly reducing manual operational effort.',
    ],
    tags: ['OpenStack', 'Cluster API', 'Kubernetes', 'Keycloak', 'Kong'],
  },
  {
    company: 'EsolLabs',
    title: 'Blockchain Developer',
    start: '06/2023',
    end: '09/2023',
    product: 'Innovaz Market Factory — cross-chain NFT and token platform',
    points: [
      'Developed and reviewed **15+ smart contracts** for DeFi and NFT use cases using **Solidity** and **Move**.',
      'Built **event-driven backend services** to capture, process and synchronize on-chain events into **off-chain databases and APIs**.',
      'Integrated backend services with **5+ blockchain networks**, including Ethereum, BSC, Polygon, Aptos and Sui, ensuring consistent transaction handling and data integrity.',
    ],
    tags: ['Solidity', 'Move', 'Event-driven', 'EVM', 'Aptos', 'Sui'],
  },
];

export type Project = {
  name: string;
  kind: string;
  summary: string;
  points: string[];
  stack: string[];
  links?: { label: string; href: string }[];
};

export const featured: Project = {
  name: 'LockLens',
  kind: 'Open source · PostgreSQL observability',
  summary: 'An open-source PostgreSQL monitoring and incident investigation platform.',
  points: [
    'Multi-instance metrics, query workload and replication monitoring, built with **Go**, **React/TypeScript** and **PostgreSQL/TimescaleDB**.',
    '**Read-only collectors** and a **rule engine** that detect blocking chains, root blockers, long transactions and query regressions — preserving incident timelines and evidence.',
    'Interactive dashboards, database load analysis, a read-only SQL editor and execution-plan visualization; automated tests, Docker deployments and a reproducible PostgreSQL lab.',
  ],
  stack: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'TimescaleDB', 'Docker'],
  links: [
    { label: 'Website', href: 'https://huy-8bit.github.io/locklens-site/' },
    { label: 'Source', href: 'https://github.com/Huy-8bit/locklens' },
  ],
};

export const projects: Project[] = [
  {
    name: 'DattingQ',
    kind: 'Dating platform',
    summary: 'Backend for a dating platform.',
    points: [
      'Backend on **gRPC-Gateway, Kafka, MongoDB and Redis**, supporting up to **1.5K requests/second** at **80–100 ms** API latency.',
      'Multi-cluster failover and observability with OpenTelemetry, Prometheus, Grafana, ELK and ClickHouse, achieving **99.95% uptime**.',
    ],
    stack: ['gRPC', 'Kafka', 'MongoDB', 'Redis', 'OpenTelemetry', 'ClickHouse'],
  },
  {
    name: 'MeetQ',
    kind: 'AI-powered online meetings',
    summary: 'Real-time meeting platform.',
    points: [
      'Real-time meetings on **LiveKit**, integrating **OpenAI** models for live transcription, voice translation and meeting summarization.',
      'Designed the **real-time translation pipeline** and optimized conversational context handling to improve translation accuracy and coherence.',
    ],
    stack: ['LiveKit', 'OpenAI', 'Real-time', 'Speech'],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Golang', 'Python', 'Java'] },
  { group: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'OpenSearch', 'ClickHouse'] },
  { group: 'Messaging & streaming', items: ['Kafka', 'RabbitMQ'] },
  { group: 'Cloud & infrastructure', items: ['AWS', 'OpenStack', 'Kubernetes', 'Terraform', 'Docker', 'Consul', 'Vault'] },
  { group: 'Core banking', items: ['Vault Core (Thought Machine)', 'T24 (Temenos)'] },
  { group: 'Observability', items: ['OpenTelemetry', 'Prometheus', 'Grafana', 'ELK'] },
  { group: 'APIs & frameworks', items: ['Spring Boot', 'FastAPI', 'gRPC'] },
  { group: 'CI/CD & tooling', items: ['Git', 'Jenkins', 'ArgoCD', 'Postman'] },
];

export const education = [
  { title: 'University of Science, Ho Chi Minh City (HCMUS)', detail: 'B.Sc. Information Technology — Knowledge Engineering' },
  { title: 'DevOps on AWS Specialization', detail: 'Coursera · Certificate' },
];

export const marquee = ['Go', 'Python', 'Java', 'PostgreSQL', 'Kafka', 'Kubernetes', 'AWS', 'Terraform', 'Vault Core', 'Temenos T24', 'OpenStack', 'OpenSearch', 'ClickHouse', 'OpenTelemetry', 'gRPC', 'ArgoCD'];
