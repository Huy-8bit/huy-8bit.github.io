// Project content for the home page and the case-study pages (/projects/<slug>/).
//
// Sources, all public:
//   LockLens  — github.com/Huy-8bit/locklens: README.md, docs/architecture.md, docs/limitations.md
//   KeyShift  — github.com/Huy-8bit/keyshift: README.md, docs/how-it-works.md, docs/adaptive-admission.md,
//               docs/benchmarks.md (results from one developer laptop, labelled as such)
//   ExtendPad — github.com/Huy-8bit/ExtendPad: README.md, docs/ARCHITECTURE.md
// Rules: no invented users, stars or adoption; benchmark figures always carry their conditions;
// nothing here claims production use. ExtendPad has no published screenshots, so it shows none,
// and its latency measurements (tied to one test device) are left out on purpose.
import type { ImageMetadata } from 'astro';
import llOverview from '../assets/locklens-overview.png';
import llIncident from '../assets/locklens-incident.png';
import llLoad from '../assets/locklens-load.png';
import llSql from '../assets/locklens-sql.png';

export type LinkKind = 'case' | 'website' | 'source' | 'reference' | 'docs';
export type ProjectLink = { label: string; href: string; kind: LinkKind };
export type Shot = { image: ImageMetadata; alt: string; caption: string };
export type Fact = { label: string; value: string };
export type Item = { title: string; body: string };
export type Metric = { value: string; label: string };

export type Section =
  | { kind: 'text'; id: string; title: string; paragraphs: string[] }
  | { kind: 'items'; id: string; title: string; intro?: string; items: Item[]; diagram?: boolean }
  | { kind: 'list'; id: string; title: string; intro?: string; points: string[]; footer?: string }
  | { kind: 'table'; id: string; title: string; intro?: string; columns: [string, string, string]; rows: [string, string, string][]; after?: string }
  | { kind: 'code'; id: string; title: string; intro?: string; lang: string; code: string; caption?: string }
  | { kind: 'shots'; id: string; title: string; intro?: string }
  | { kind: 'bench'; id: string; title: string; intro: string; environment: Fact[]; results: (Metric & { note: string })[]; after: string; source: string };

export type Project = {
  slug: 'locklens' | 'keyshift' | 'extendpad';
  name: string;
  /** Short area label, shown in mono above the name. */
  area: string;
  kind: string;
  tagline: string;
  /** Home page: the problem and the approach, two short paragraphs. */
  problem: string;
  approach: string;
  highlights: string[];
  metrics?: { items: Metric[]; note: string };
  stack: string[];
  status: string;
  links: ProjectLink[];
  facts: Fact[];
  shots?: Shot[];
  /** Case-study page. */
  description: string;
  intro: string;
  sections: Section[];
};

export const projects: Project[] = [
  {
    slug: 'locklens',
    name: 'LockLens',
    area: 'PostgreSQL observability',
    kind: 'Personal project · Open source',
    tagline: 'PostgreSQL monitoring and incident investigation.',
    problem:
      'When PostgreSQL slows down or sessions block each other, it helps to see what is happening and keep that evidence after the incident ends.',
    approach:
      'LockLens samples each instance through read-only collectors, builds blocking trees with <code>pg_blocking_pids()</code>, and records incidents with the relevant statements, sessions and timeline.',
    highlights: [
      'Breaks down database load by wait class, wait event and statement using active session sampling.',
      'Shows root blockers and records incidents using 18 evidence-based rules.',
      'Flags query regressions against per-statement baselines and ranks possible explanations without treating them as confirmed causes.',
      'Connects with a read-only role and never changes the databases it monitors.',
    ],
    stack: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'TimescaleDB', 'Docker'],
    status: 'Tested against PostgreSQL 14–18 in a local lab. Not yet run in production.',
    links: [
      { label: 'Case study', href: 'projects/locklens/', kind: 'case' },
      { label: 'Website', href: 'https://huy-8bit.github.io/locklens-site/', kind: 'website' },
      { label: 'Source', href: 'https://github.com/Huy-8bit/locklens', kind: 'source' },
    ],
    facts: [
      { label: 'Type', value: 'Personal project, open source' },
      { label: 'License', value: 'MIT' },
      { label: 'Status', value: 'Tested against PostgreSQL 14–18 in a local lab; not yet run in production.' },
      { label: 'Ships as', value: 'Two Docker images: a Go backend and an nginx frontend' },
    ],
    shots: [
      { image: llOverview, alt: 'LockLens fleet overview with database health, throughput and latency charts', caption: 'Fleet overview' },
      { image: llIncident, alt: 'LockLens incident page for a blocking chain, showing the root blocker and the waiting sessions', caption: 'An incident and its evidence' },
      { image: llLoad, alt: 'LockLens database load chart broken down by wait class', caption: 'Database load by wait class' },
      { image: llSql, alt: 'LockLens read-only SQL editor with an execution plan graph', caption: 'Read-only SQL editor and plan' },
    ],
    description:
      'LockLens is an open-source PostgreSQL monitoring and incident investigation tool built with Go and React.',
    intro:
      'LockLens is a personal open-source project for monitoring PostgreSQL and investigating incidents. It combines a Go backend, collectors and a rule engine with a React interface, packaged as two Docker images.',
    sections: [
      {
        kind: 'text',
        id: 'problem',
        title: 'The problem',
        paragraphs: [
          'PostgreSQL exposes useful information about sessions, waits, locks and statements, but much of it reflects only the current state. When an incident ends, details such as the root blocker and the load at the time can disappear unless they were recorded.',
          'LockLens monitors each instance and keeps that context together, making it easier to investigate an incident while it is happening or afterward.',
        ],
      },
      {
        kind: 'items',
        id: 'how',
        title: 'How it works',
        diagram: true,
        items: [
          { title: 'One worker per instance', body: 'Each monitored instance gets a worker with a small read-only connection pool. Its collectors run on their own schedules, under a global concurrency limit.' },
          { title: 'Accurate rates', body: 'Cumulative counters become rates at ingest. Restarts, statistics resets and gaps are stored as unknown, never as zero.' },
          { title: 'Bounded writes', body: 'Writes to the monitoring store go through a bounded queue. If the store falls behind, the oldest batch is dropped and recorded as a collection gap.' },
          { title: 'Rules on recent history', body: 'After each activity collection, the incident recorder evaluates the rules on the in-memory history and opens, extends or resolves incidents with their evidence.' },
          { title: 'Live UI', body: 'The API serves live values from memory and history from the store, and pushes server-sent events so the UI refreshes only what changed.' },
          { title: 'Same analysis in the CLI', body: 'The CLI shares the collection code, blocking graph and report builder, so <code>locklens inspect</code> and the UI agree on the same data.' },
        ],
      },
      {
        kind: 'items',
        id: 'features',
        title: 'What it does',
        items: [
          { title: 'Investigate', body: 'Database load from active session sampling, by wait class, wait event, statement, user or application. Blocking trees from <code>pg_blocking_pids()</code> with lock modes and wait times, idle-in-transaction blockers, and 18 evidence-based rules.' },
          { title: 'Query performance', body: 'Each statement is compared with its own baseline (median and MAD, by hour of day) to flag slower calls, more calls, more I/O or a possible N+1. Evidence is correlated into ranked hypotheses, never presented as confirmed causes.' },
          { title: 'Optimize', body: 'Index and statistics recommendations from each database’s schema and workload, analysed with PostgreSQL’s own parser, with optional what-if checks on hypothetical indexes. LockLens shows the SQL; it never applies it.' },
          { title: 'Monitor', body: 'Fleet and per-instance dashboards, replication topology with replay lag, host metrics from node_exporter, and a timeline of changes such as restarts, failovers and dropped indexes.' },
          { title: 'Alert and integrate', body: 'Notifications to Slack, webhooks, email and Prometheus Alertmanager, with escalation, silences and maintenance windows. Prometheus metrics, OpenTelemetry push and read-only API tokens.' },
          { title: 'Command line', body: '<code>doctor</code>, <code>inspect</code>, <code>watch</code> and <code>snapshot</code> work directly against a database, without the server.' },
        ],
      },
      { kind: 'shots', id: 'screenshots', title: 'Screenshots', intro: 'From the LockLens repository, taken against the demo lab. Select one to enlarge it.' },
      {
        kind: 'code',
        id: 'cli',
        title: 'A blocking chain from the command line',
        intro: '<code>locklens inspect</code> against a database with an A → B → C chain, from the project README:',
        lang: 'text',
        code: `Blocking chains (blocker -> waiter)
  Incident 1: root blocker pid 116 blocks 1 directly, 2 in total
    pid 116  idle in transaction  tx 3s  user=demo_app  app=locklens-demo-A  blocks 1 directly, 2 in total
    └─ pid 117  active  lock wait 3s  tx 3s  user=demo_app  app=locklens-demo-B
       └─ pid 118  active  lock wait 3s  tx 3s  user=demo_app  app=locklens-demo-C`,
      },
      {
        kind: 'list',
        id: 'safety',
        title: 'Observe-only by design',
        points: [
          'Monitored servers need a login role with <code>pg_read_all_stats</code>. No superuser.',
          'LockLens never cancels queries, terminates sessions, changes configuration, or runs DDL or DML on the databases it watches.',
          'Connection strings are encrypted at rest with AES-256-GCM and never returned by the API or shown in the UI, logs or exports.',
          'Row browsing and the SQL editor are off by default, limited to operators and administrators, and run inside read-only transactions.',
        ],
      },
      {
        kind: 'list',
        id: 'testing',
        title: 'Testing and status',
        points: [
          'The test suites pass against PostgreSQL 14 through 18 in a local lab.',
          'Go unit tests run with the race detector. Integration tests use real PostgreSQL, and end-to-end tests cover the CLI, the server and the browser.',
          'A demo lab starts a primary, three streaming standbys and a background workload, and can stage scenarios such as a blocking chain.',
        ],
        footer:
          'LockLens has not yet been run in production. Performance figures in its documentation are lab measurements, not guarantees.',
      },
    ],
  },
  {
    slug: 'keyshift',
    name: 'KeyShift',
    area: 'Redis caching',
    kind: 'Personal project · Open source',
    tagline: 'Selective client-side caching for Redis, in Go.',
    problem:
      'Some Redis workloads repeatedly read the same keys. Caching them locally can save network round trips, but Redis must track cached keys and invalidate them when they change.',
    approach:
      'KeyShift detects frequently read keys in each application instance and scores them against factors such as read rate, writes, value size and available memory. Selected keys are cached locally and invalidated through Redis client tracking; other reads go to Redis.',
    highlights: [],
    metrics: {
      items: [
        { value: '50–86%', label: 'fewer GETs reaching Redis, on workloads with locality' },
        { value: '≤ 547', label: 'keys tracked by Redis per instance, in every scenario' },
        { value: '0', label: 'stale reads with connections killed and Redis restarted mid-run' },
      ],
      note: 'From the project’s benchmark suite on one Apple M1 Pro laptop, with Redis 8.6.8 in Docker on the same machine. Lab results, not guarantees.',
    },
    stack: ['Go', 'Redis', 'go-redis', 'rueidis', 'Prometheus', 'Grafana'],
    status: 'Version 0.1.0, pre-1.0. Tested against Redis 6.2–8.6, standalone and Cluster.',
    links: [
      { label: 'Case study', href: 'projects/keyshift/', kind: 'case' },
      { label: 'Website', href: 'https://huy-8bit.github.io/keyshift-site/', kind: 'website' },
      { label: 'Source', href: 'https://github.com/Huy-8bit/keyshift', kind: 'source' },
      { label: 'Go reference', href: 'https://pkg.go.dev/github.com/Huy-8bit/keyshift/pkg/keyshift', kind: 'reference' },
    ],
    facts: [
      { label: 'Type', value: 'Personal project, open source' },
      { label: 'License', value: 'Apache 2.0' },
      { label: 'Status', value: 'Version 0.1.0, pre-1.0. APIs may change.' },
      { label: 'Requires', value: 'Go 1.26+, Redis 6.0+ with RESP3' },
    ],
    description:
      'KeyShift is a Go SDK for selective Redis client-side caching, with hot-key detection and adaptive admission.',
    intro:
      'KeyShift is a personal open-source Go SDK that selects which Redis keys to cache inside each application instance. It is currently at version 0.1.0.',
    sections: [
      {
        kind: 'text',
        id: 'problem',
        title: 'The problem',
        paragraphs: [
          'In some Redis workloads, a small set of keys receives most of the reads. Keeping those values in application memory avoids network round trips, but Redis still needs to track and invalidate the cached copies. Frequently changing keys may be invalidated before the cache can be useful.',
          'Popularity also looks different from each instance. A key read 2,000 times per second across 50 pods may receive only 40 reads per second on each one. KeyShift therefore makes caching decisions using each instance’s own measurements.',
        ],
      },
      {
        kind: 'items',
        id: 'how',
        title: 'How it works',
        diagram: true,
        items: [
          { title: 'Detect', body: 'Every read passes through a bounded, lock-sharded Space-Saving top-K detector with window decay. It uses fixed memory, about 0.8 MiB at default limits.' },
          { title: 'Admit', body: 'Every window (10 s by default), candidates are scored on read rate, predicted or measured hit ratio, writes, invalidations, value size and the memory budget. A key is admitted after qualifying two windows in a row.' },
          { title: 'Serve and invalidate', body: 'Admitted keys are read on connections with Redis client tracking (RESP3), so Redis pushes an invalidation when one of them changes. Only admitted keys are tracked; every other read goes straight to Redis.' },
          { title: 'Back off', body: 'If a cached key’s measured hit ratio drops below 0.3, usually because something else writes it, the key goes into cooldown: 30 s at first, doubling with each strike.' },
          { title: 'Fail safe', body: 'A health probe checks the tracked path every second. If tracking can’t be confirmed, caching pauses, the local cache is flushed and reads go to Redis. Entries also have a maximum age, 3 s by default.' },
          { title: 'Fleet view, optional', body: 'A controller ranks hot keys across the fleet from telemetry sent about every 30 s, with keys as HMAC fingerprints, and rolls out versioned policies. It is never on the request path, and policies can only tighten local limits.' },
        ],
      },
      {
        kind: 'code',
        id: 'explain',
        title: 'Understanding a caching decision',
        intro: '<code>client.Explain(key)</code> returns a key’s current state and the reason for it. This example from the docs shows a key that another service writes frequently:',
        lang: 'go',
        code: `d := client.Explain("stock:7")
// State:  "cooldown"
// Reason: "observed hit ratio 0.04 below exit threshold 0.30
//          (fills 29 / reads 30, invalidations 29); cooldown 1m0s"`,
      },
      {
        kind: 'bench',
        id: 'benchmarks',
        title: 'Benchmark results',
        intro:
          'The repository includes a reproducible benchmark suite: uniform, Zipf, single-hot, write-heavy, expiring, hot-shift and fault-injection workloads. Open-loop runs offer the same 20,000 operations per second to every configuration, and a read counts as stale when it returns a version older than one committed before the read started.',
        environment: [
          { label: 'Date', value: '20 November 2026' },
          { label: 'Machine', value: 'Apple M1 Pro laptop, 8 CPUs' },
          { label: 'Redis', value: '8.6.8 in Docker, on the same machine as the client' },
          { label: 'Toolchain', value: 'Go 1.26.11, go-redis 9.23.0, rueidis 1.0.80' },
          { label: 'Settings', value: '1 s detection window, 1,000 entries / 16 MiB, max staleness 3 s' },
        ],
        results: [
          { value: '50–86%', label: 'fewer GETs reaching Redis', note: 'Open loop, on workloads with locality.' },
          { value: '0–547', label: 'keys tracked by Redis', note: 'Per instance, across all scenarios. Only admitted keys are tracked.' },
          { value: '0', label: 'stale reads under faults', note: 'With client connections killed mid-run, and with Redis restarted mid-run.' },
          { value: '~0.3 µs', label: 'per local cache hit', note: 'rueidis driver. A Redis round trip on this machine took about 0.2 ms.' },
          { value: '~0.1 s', label: 'to aggregate 5,000 instances', note: 'Controller. A logical simulation on one machine, not 5,000 real pods.' },
        ],
        after:
          'On workloads where caching can’t help, such as uniform access or values over the size limit, KeyShift admitted nothing. Redis load matched the uncached baseline, while the detector’s own overhead remained. Client and Redis shared one machine, so results on a real network will differ.',
        source: 'https://github.com/Huy-8bit/keyshift/blob/main/docs/benchmarks.md',
      },
      {
        kind: 'list',
        id: 'limits',
        title: 'Limits',
        points: [
          'Cached reads are eventually consistent. Invalidation delivery and the maximum entry age bound how long a changed value can still be served; there is no strong consistency.',
          'With go-redis, caching works on standalone Redis. On Redis Cluster, caching uses the rueidis driver.',
          'A key has to qualify for a couple of windows before it is cached, so new hot keys take a little while to be served from memory.',
          'Version 0.1.0: APIs may change before 1.0, and KeyShift hasn’t been proven in large production deployments.',
        ],
      },
    ],
  },
  {
    slug: 'extendpad',
    name: 'ExtendPad',
    area: 'macOS + Android',
    kind: 'Personal project · Source available',
    tagline: 'An Android tablet as a real extended display for the Mac, over USB-C.',
    problem:
      'An Android tablet cannot directly accept video input, and macOS has no public API for creating a display it treats as a monitor. Screen capture alone can only mirror an existing screen.',
    approach:
      'ExtendPad creates a virtual monitor on the Mac, captures and encodes it as H.264, then streams it over USB using <code>adb reverse</code>. The tablet decodes the video in hardware and draws the cursor using positions sent at 120 Hz.',
    highlights: [
      'Isolates the private display API in one Objective-C file and reports an error if it becomes unavailable.',
      'Limits buffering across the pipeline and drops frames before encoding to prevent queues from growing.',
      'Authenticates the Mac and tablet with HMAC-SHA256 using a pairing token delivered over ADB.',
    ],
    stack: ['Swift', 'SwiftUI', 'Objective-C', 'Kotlin', 'ScreenCaptureKit', 'VideoToolbox', 'MediaCodec'],
    status: 'macOS 13+ on Apple Silicon or Intel, and Android 8+.',
    links: [
      { label: 'Case study', href: 'projects/extendpad/', kind: 'case' },
      { label: 'Website', href: 'https://huy-8bit.github.io/extendpad-site/', kind: 'website' },
      { label: 'Source', href: 'https://github.com/Huy-8bit/ExtendPad', kind: 'source' },
    ],
    facts: [
      { label: 'Type', value: 'Personal project, source on GitHub' },
      { label: 'Platforms', value: 'macOS 13+ (Apple Silicon or Intel), Android 8+' },
      { label: 'Apps', value: 'A Swift menu-bar app for the Mac and a Kotlin app for the tablet' },
    ],
    description:
      'ExtendPad turns an Android tablet into an extended macOS display over USB-C using a virtual display and hardware H.264 encoding.',
    intro:
      'ExtendPad is a personal project that turns an Android tablet into an extended display for a Mac over USB-C. It consists of a Swift menu-bar app for macOS and a Kotlin app for Android.',
    sections: [
      {
        kind: 'text',
        id: 'problem',
        title: 'The problem',
        paragraphs: [
          'A tablet has no direct video input, so using it as a second screen requires a software solution. macOS can extend the desktop onto a monitor, but has no public API to create one. Its capture APIs only capture existing screens.',
          'ExtendPad creates a virtual display and streams it to the tablet, limiting buffering along the way to avoid accumulating delay.',
        ],
      },
      {
        kind: 'items',
        id: 'how',
        title: 'How it works',
        diagram: true,
        items: [
          { title: 'A real virtual display', body: '“ExtendPad Display” is created with macOS’s private <code>CGVirtualDisplay</code> API, so it appears in System Settings → Displays like any monitor. All private calls live in one Objective-C file and are resolved at runtime. If a future macOS removes the API, ExtendPad reports it clearly and never falls back to mirroring.' },
          { title: 'Capture only what changes', body: 'ScreenCaptureKit captures that one display, and only when something on it changes, so a static screen costs almost nothing.' },
          { title: 'Hardware H.264', body: 'VideoToolbox encodes in hardware with low-latency rate control and no B-frames, on its own queue so acknowledgements and heartbeats never wait behind an encode.' },
          { title: 'A private link over USB', body: 'The Mac listens only on 127.0.0.1 and <code>adb reverse</code> carries the connection over the cable. Both sides authenticate with HMAC-SHA256, using a pairing token delivered only over ADB.' },
          { title: 'Decode and draw', body: 'The tablet decodes with MediaCodec in hardware and letterboxes the picture, never stretching it.' },
          { title: 'A cursor that doesn’t wait', body: 'The Mac sends the pointer position at 120 Hz on a separate control channel, and the tablet draws the cursor itself, so it never waits for a video frame.' },
        ],
      },
      {
        kind: 'table',
        id: 'pipeline',
        title: 'Keeping the pipeline bounded',
        intro: 'The architecture sets limits at each stage and defines what happens when they are reached:',
        columns: ['Stage', 'Limit', 'When it’s full'],
        rows: [
          ['Capture', '6 surfaces', 'ScreenCaptureKit drops frames'],
          ['Capture → encoder', '1 slot', 'The newer frame replaces the older one'],
          ['Encoder', '1 frame in flight', 'Waits for the slot'],
          ['Network', '6 unacknowledged frames, 250 ms or 3 MiB', 'Encoding pauses'],
          ['Stall', 'No acknowledgement for 1.5 s', 'Reset and force a keyframe'],
          ['Tablet decoder', '8 access units', 'Flush and request a keyframe'],
        ],
        after:
          'Frames are dropped before the encoder, never after, so the H.264 reference chain stays valid. An early version queued one task per captured frame; when the encoder slowed down, the queue grew and so did the delay. The single-slot design replaced it.',
      },
      {
        kind: 'list',
        id: 'testing',
        title: 'Testing',
        points: [
          '49 unit tests on the Mac and a JVM unit test suite on Android. Both check the same protocol and HMAC test vectors, from one shared file.',
          'A built-in Mac self-test runs the real virtual display, capture, encoder and protocol against an in-process client.',
          'End-to-end scenarios on the Android emulator cover pause and resume, settings changes, adb restarts, disconnects and reconnects.',
        ],
      },
      {
        kind: 'list',
        id: 'limits',
        title: 'Limits',
        points: [
          'It depends on a private macOS API, so a macOS update could break virtual display creation. ExtendPad then shows an error.',
          'The Mac app is ad-hoc signed and not notarized, so macOS asks for confirmation the first time it opens.',
          'Touch input is implemented and unit-tested, but not yet verified on a real device.',
          'Unplugging and replugging the cable, Mac sleep and wake, and multi-hour sessions have not been tested yet.',
        ],
      },
    ],
  },
];

/** Smaller projects, listed after the featured work. */
export const moreProjects: { name: string; area: string; summary: string; stack: string[]; href: string }[] = [
  {
    name: 'MeetQ',
    area: 'Real-time meetings',
    summary: 'A real-time meeting platform on LiveKit, with live transcription, voice translation and meeting summaries using OpenAI models.',
    stack: ['LiveKit', 'OpenAI', 'Python'],
    href: 'https://github.com/Huy-8bit/MeetQ',
  },
];

export const getProject = (slug: Project['slug']) => projects.find((p) => p.slug === slug)!;
