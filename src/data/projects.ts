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
    tagline: 'A closer look at what’s happening inside PostgreSQL.',
    problem:
      'A slow database can be difficult to investigate after the fact. By the time you look, the blocking session may be gone and the useful details with it.',
    approach:
      'I built LockLens to capture that context. It samples PostgreSQL through read-only collectors, maps blocking chains with <code>pg_blocking_pids()</code>, and keeps the sessions, statements and timeline together.',
    highlights: [
      'Explore database load by wait class, event and statement.',
      'Trace blocking chains to the root session and record incidents using 18 evidence-based rules.',
      'Compare statements with their baselines and investigate ranked hypotheses, not presumed causes.',
      'Monitor through a read-only role without changing the databases.',
    ],
    stack: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'TimescaleDB', 'Docker'],
    status: 'Tested locally with PostgreSQL 14–18; not yet used in production.',
    links: [
      { label: 'Case study', href: 'projects/locklens/', kind: 'case' },
      { label: 'Website', href: 'https://huy-8bit.github.io/locklens-site/', kind: 'website' },
      { label: 'Source', href: 'https://github.com/Huy-8bit/locklens', kind: 'source' },
    ],
    facts: [
      { label: 'Type', value: 'Personal project, open source' },
      { label: 'License', value: 'MIT' },
      { label: 'Status', value: 'Tested locally with PostgreSQL 14–18; not yet used in production' },
      { label: 'Ships as', value: 'Two Docker images: a Go backend and an nginx frontend' },
    ],
    shots: [
      { image: llOverview, alt: 'LockLens fleet overview with database health, throughput and latency charts', caption: 'Fleet overview' },
      { image: llIncident, alt: 'LockLens incident page for a blocking chain, showing the root blocker and the waiting sessions', caption: 'Blocking incident details' },
      { image: llLoad, alt: 'LockLens database load chart broken down by wait class', caption: 'Database load by wait class' },
      { image: llSql, alt: 'LockLens read-only SQL editor with an execution plan graph', caption: 'Read-only SQL editor and plan' },
    ],
    description:
      'A look at LockLens, my open-source tool for monitoring PostgreSQL and investigating incidents.',
    intro:
      'LockLens is my open-source PostgreSQL monitoring project. It brings a Go backend and React interface together to show what a database is doing and retain the evidence needed to investigate incidents.',
    sections: [
      {
        kind: 'text',
        id: 'problem',
        title: 'Why I built it',
        paragraphs: [
          'PostgreSQL exposes a lot of useful detail about sessions, waits, locks and statements. The catch is that much of it describes what’s happening now. Once an incident ends, the root blocker and the load around it can disappear from view.',
          'I wanted a way to follow an incident as it unfolds and come back to the same evidence later. LockLens collects that context from each monitored instance and keeps it together.',
        ],
      },
      {
        kind: 'items',
        id: 'how',
        title: 'How it works',
        diagram: true,
        items: [
          { title: 'Collecting data', body: 'Each monitored instance has a worker with a small read-only connection pool. Collectors run on their own schedules, with a global limit on concurrency.' },
          { title: 'Reading counters', body: 'Cumulative counters are converted to rates as data comes in. A restart, statistics reset or collection gap is recorded as unknown rather than zero.' },
          { title: 'Writing to the store', body: 'A bounded queue holds writes to the monitoring store. If the store falls behind, LockLens drops the oldest batch and records the gap.' },
          { title: 'Recording incidents', body: 'After each activity sample, the recorder evaluates rules against recent in-memory history. It opens, extends or resolves incidents and keeps their evidence.' },
          { title: 'Updating the interface', body: 'The API serves current values from memory and history from the store. Server-sent events tell the interface what needs to refresh.' },
          { title: 'Using the command line', body: 'The CLI uses the same collectors, blocking graph and report builder as the web interface. You can run <code>locklens inspect</code> directly against a database.' },
        ],
      },
      {
        kind: 'items',
        id: 'features',
        title: 'What it does',
        items: [
          { title: 'Investigate activity', body: 'Break down sampled database load by wait class, event, statement, user or application. Inspect blocking trees, lock modes, wait times and idle-in-transaction blockers, with 18 evidence-based rules to help identify incidents.' },
          { title: 'Find query regressions', body: 'Compare each statement with its own baseline, using median and MAD by hour of day, to flag changes in latency, call volume or I/O, as well as possible N+1 patterns. Related evidence is ranked as hypotheses, not confirmed causes.' },
          { title: 'Review recommendations', body: 'Get index and statistics recommendations based on the schema and workload, with optional what-if checks using hypothetical indexes. LockLens shows the SQL but never applies it.' },
          { title: 'Monitor instances', body: 'View fleet and instance dashboards, replication topology and replay lag, host metrics from node_exporter, and a timeline of changes such as restarts, failovers and dropped indexes.' },
          { title: 'Receive alerts', body: 'Send notifications to Slack, webhooks, email or Prometheus Alertmanager, with escalation, silences and maintenance windows. Prometheus metrics, OpenTelemetry push and read-only API tokens are also available.' },
          { title: 'Work from the terminal', body: 'Run <code>doctor</code>, <code>inspect</code>, <code>watch</code> or <code>snapshot</code> directly against a database without starting the server.' },
        ],
      },
      { kind: 'shots', id: 'screenshots', title: 'Screenshots', intro: 'These screenshots come from the LockLens demo lab. Select one to see it in more detail.' },
      {
        kind: 'code',
        id: 'cli',
        title: 'A blocking chain from the command line',
        intro: 'Here’s what <code>locklens inspect</code> reports for an A → B → C blocking chain, from the project README:',
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
        title: 'Read-only access',
        points: [
          'Each monitored server needs a login role with <code>pg_read_all_stats</code>; a superuser is not required.',
          'LockLens does not cancel queries, terminate sessions, change configuration or run DDL or DML on monitored databases.',
          'Connection strings are encrypted at rest with AES-256-GCM. They are not returned by the API or shown in the UI, logs or exports.',
          'Row browsing and the SQL editor are disabled by default, restricted to operators and administrators, and run in read-only transactions.',
        ],
      },
      {
        kind: 'list',
        id: 'testing',
        title: 'Testing and status',
        points: [
          'The test suites pass locally against PostgreSQL 14 through 18.',
          'Go unit tests run with the race detector; integration tests use PostgreSQL, and end-to-end tests cover the CLI, server and browser.',
          'The demo lab runs a primary, three streaming standbys and a background workload, with scenarios such as blocking chains.',
        ],
        footer:
          'I haven’t run LockLens in production yet. The performance figures in its documentation are lab measurements, not guarantees.',
      },
    ],
  },
  {
    slug: 'keyshift',
    name: 'KeyShift',
    area: 'Redis caching',
    kind: 'Personal project · Open source',
    tagline: 'A Go SDK that chooses which Redis keys to cache locally.',
    problem:
      'Local caching can save repeated trips to Redis, but caching everything isn’t free. Each key needs to be tracked and invalidated when its value changes.',
    approach:
      'With KeyShift, each application instance looks at its own traffic and selects keys worth caching. It considers read rate, writes, value size and available memory, then uses Redis client tracking to invalidate cached values.',
    highlights: [],
    metrics: {
      items: [
        { value: '50–86%', label: 'fewer GETs reaching Redis in workloads with locality' },
        { value: '≤ 547', label: 'keys tracked per instance across all scenarios' },
        { value: '0', label: 'stale reads in connection-kill and Redis-restart tests' },
      ],
      note: 'Measured by the benchmark suite on one Apple M1 Pro laptop, with Redis 8.6.8 in Docker on the same machine. These are lab results, not guarantees.',
    },
    stack: ['Go', 'Redis', 'go-redis', 'rueidis', 'Prometheus', 'Grafana'],
    status: 'Version 0.1.0. Tested with Redis 6.2–8.6, standalone and Cluster.',
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
      'A look at KeyShift, my Go SDK for deciding which Redis keys to cache locally.',
    intro:
      'KeyShift is an open-source Go SDK I built to experiment with selective Redis caching. Each application instance decides which keys to keep in memory based on its own traffic. The project is currently at version 0.1.0.',
    sections: [
      {
        kind: 'text',
        id: 'problem',
        title: 'Why I built it',
        paragraphs: [
          'Some workloads read the same Redis keys again and again. Keeping those values in application memory avoids network trips, but Redis has to track the cached copies and invalidate them on writes. A frequently updated key may not stay cached long enough to be useful.',
          'A key’s popularity also depends on where you measure it: 2,000 reads per second across 50 pods may mean only 40 per pod. I wanted KeyShift to make that decision locally, using what each instance actually sees.',
        ],
      },
      {
        kind: 'items',
        id: 'how',
        title: 'How it works',
        diagram: true,
        items: [
          { title: 'Find hot keys', body: 'Reads pass through a lock-sharded Space-Saving top-K detector with window decay. Its memory use is fixed at about 0.8 MiB with the default limits.' },
          { title: 'Choose what to cache', body: 'Every window, 10 seconds by default, KeyShift scores candidates by read rate, predicted or measured hit ratio, writes, invalidations, value size and memory budget. A key must qualify in two consecutive windows.' },
          { title: 'Keep cached values fresh', body: 'Admitted keys use Redis client tracking over RESP3. Redis sends an invalidation when a tracked key changes; reads for other keys go straight to Redis.' },
          { title: 'Back off when needed', body: 'If a cached key’s measured hit ratio falls below 0.3, it enters cooldown for 30 seconds. The cooldown doubles with each subsequent strike.' },
          { title: 'Handle lost tracking', body: 'A health probe checks the tracked path every second. If it can’t confirm tracking, KeyShift pauses caching, clears local entries and sends reads to Redis. Entries also expire after a maximum age, three seconds by default.' },
          { title: 'Coordinate across instances', body: 'An optional controller receives telemetry roughly every 30 seconds, with keys represented by HMAC fingerprints. It ranks hot keys across the fleet and distributes versioned policies that can only tighten local limits. The controller stays off the request path.' },
        ],
      },
      {
        kind: 'code',
        id: 'explain',
        title: 'Understanding a caching decision',
        intro: 'To see why KeyShift made a decision, call <code>client.Explain(key)</code>. This example from the docs shows a key that another service writes frequently:',
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
          'The benchmark suite covers uniform, Zipf, single-hot, write-heavy, expiring, hot-shift and fault-injection workloads. In open-loop runs, each configuration receives the same 20,000 operations per second. A read is counted as stale if it returns a version older than one committed before the read began.',
        environment: [
          { label: 'Date', value: '20 November 2026' },
          { label: 'Machine', value: 'Apple M1 Pro laptop, 8 CPUs' },
          { label: 'Redis', value: '8.6.8 in Docker, on the same machine as the client' },
          { label: 'Toolchain', value: 'Go 1.26.11, go-redis 9.23.0, rueidis 1.0.80' },
          { label: 'Settings', value: '1 s detection window, 1,000 entries / 16 MiB, max staleness 3 s' },
        ],
        results: [
          { value: '50–86%', label: 'fewer GETs reaching Redis', note: 'Open-loop workloads with locality.' },
          { value: '0–547', label: 'keys tracked by Redis', note: 'Per instance across all scenarios; only admitted keys are tracked.' },
          { value: '0', label: 'stale reads under faults', note: 'In separate tests killing client connections and restarting Redis mid-run.' },
          { value: '~0.3 µs', label: 'per local cache hit', note: 'Using rueidis; a Redis round trip on the same machine took about 0.2 ms.' },
          { value: '~0.1 s', label: 'to aggregate 5,000 instances', note: 'Controller test using a logical simulation on one machine, not 5,000 real pods.' },
        ],
        after:
          'For uniform access and values above the size limit, KeyShift admitted no keys. Redis load matched the uncached baseline, though the detector still added overhead. The client and Redis ran on the same machine, so results over a network will differ.',
        source: 'https://github.com/Huy-8bit/keyshift/blob/main/docs/benchmarks.md',
      },
      {
        kind: 'list',
        id: 'limits',
        title: 'Current limitations',
        points: [
          'Cached reads are eventually consistent, not strongly consistent. Invalidation delivery and the maximum entry age bound how long an old value can be served.',
          'The go-redis driver supports caching with standalone Redis; Redis Cluster caching uses rueidis.',
          'A newly hot key must qualify for two windows before it is cached, so it won’t be served from memory immediately.',
          'The API may change before version 1.0, and KeyShift has not been proven in large production deployments.',
        ],
      },
    ],
  },
  {
    slug: 'extendpad',
    name: 'ExtendPad',
    area: 'macOS + Android',
    kind: 'Personal project · Source available',
    tagline: 'Turn an Android tablet into a second Mac display over USB-C.',
    problem:
      'An Android tablet can’t simply plug into a Mac as a monitor, and capturing an existing screen only gives you a mirror of that screen.',
    approach:
      'ExtendPad creates a virtual display on the Mac and streams it to the tablet over USB using <code>adb reverse</code>. Video is encoded as H.264 and decoded in hardware; the tablet draws the cursor separately using positions sent at 120 Hz.',
    highlights: [
      'Keeps the private display API in one Objective-C file and reports an error if it becomes unavailable.',
      'Limits buffering and drops frames before encoding to keep queues from growing.',
      'Authenticates both devices with HMAC-SHA256 and a pairing token delivered over ADB.',
    ],
    stack: ['Swift', 'SwiftUI', 'Objective-C', 'Kotlin', 'ScreenCaptureKit', 'VideoToolbox', 'MediaCodec'],
    status: 'Requires macOS 13+ on Apple Silicon or Intel and Android 8+.',
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
      'A look at ExtendPad, my project for using an Android tablet as an extended Mac display.',
    intro:
      'ExtendPad turns an Android tablet into an extended display for a Mac over USB-C. I built it as two apps: a Swift menu-bar app on the Mac and a Kotlin app on the tablet.',
    sections: [
      {
        kind: 'text',
        id: 'problem',
        title: 'The challenge',
        paragraphs: [
          'A tablet can’t directly receive a video signal from the Mac, so the display needs to be created and streamed in software. macOS has no public API for creating a monitor, while its capture APIs can only capture screens that already exist.',
          'ExtendPad creates a virtual display first, then sends its picture to the tablet. The other challenge is keeping the pipeline responsive without letting frames pile up.',
        ],
      },
      {
        kind: 'items',
        id: 'how',
        title: 'How it works',
        diagram: true,
        items: [
          { title: 'Create the display', body: 'ExtendPad uses the private <code>CGVirtualDisplay</code> API to create a display that appears in System Settings → Displays. The private calls are isolated in one Objective-C file and resolved at runtime. If the API becomes unavailable, the app reports an error rather than falling back to mirroring.' },
          { title: 'Capture changes', body: 'ScreenCaptureKit captures the virtual display when its contents change, avoiding unnecessary capture work on a static screen.' },
          { title: 'Encode video', body: 'VideoToolbox encodes H.264 in hardware with low-latency rate control and no B-frames. Encoding runs on a separate queue so acknowledgements and heartbeats don’t wait behind it.' },
          { title: 'Connect over USB', body: 'The Mac listens on 127.0.0.1, and <code>adb reverse</code> carries the connection over USB. Both devices authenticate with HMAC-SHA256 and a pairing token delivered over ADB.' },
          { title: 'Show the picture', body: 'The tablet decodes video in hardware with MediaCodec and letterboxes the image to preserve its proportions.' },
          { title: 'Draw the pointer separately', body: 'The Mac sends pointer positions at 120 Hz over a separate control channel. The tablet draws the cursor without waiting for the next video frame.' },
        ],
      },
      {
        kind: 'table',
        id: 'pipeline',
        title: 'Keeping the pipeline bounded',
        intro: 'To keep a slow stage from building up delay, the pipeline sets limits and defines what happens when each one is reached:',
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
          'Frames are dropped before encoding, not after, to preserve the H.264 reference chain. An earlier version queued a task for every captured frame; when the encoder slowed down, the queue and delay grew. I replaced that queue with a single slot.',
      },
      {
        kind: 'list',
        id: 'testing',
        title: 'Testing',
        points: [
          'The Mac app has 49 unit tests, and the Android app has a JVM unit test suite. Both use shared protocol and HMAC test vectors.',
          'A built-in Mac self-test exercises the virtual display, capture, encoder and protocol with an in-process client.',
          'Android emulator end-to-end scenarios cover pause and resume, settings changes, adb restarts, disconnects and reconnects.',
        ],
      },
      {
        kind: 'list',
        id: 'limits',
        title: 'Current limitations',
        points: [
          'A macOS update could break the private API used to create the virtual display. If that happens, ExtendPad reports an error.',
          'The Mac app is ad-hoc signed and not notarized, so macOS asks for confirmation on first launch.',
          'Touch input is implemented and unit-tested but has not been verified on a real device.',
          'Cable reconnection, Mac sleep and wake, and multi-hour sessions have not yet been tested.',
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
    summary: 'A meeting platform built on LiveKit, with live transcription, voice translation and summaries using OpenAI models.',
    stack: ['LiveKit', 'OpenAI', 'Python'],
    href: 'https://github.com/Huy-8bit/MeetQ',
  },
];

export const getProject = (slug: Project['slug']) => projects.find((p) => p.slug === slug)!;
