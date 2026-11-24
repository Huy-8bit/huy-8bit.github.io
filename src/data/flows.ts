// Flow-lane diagrams. Each lane is one path through the system, read left to right.
// Every node comes from the project's own architecture docs (see ./projects.ts for sources).

export type FlowNode = { title: string; sub?: string; code?: boolean; accent?: boolean; dashed?: boolean };
export type Lane = { label: string; note?: string; tone?: 'accent' | 'quiet'; nodes: FlowNode[] };
export type Flow = { id: string; title: string; lanes: Lane[]; legend?: { accent?: string; quiet?: string } };

export const keyshiftFlow: Flow = {
  id: 'keyshift',
  title: 'A read through KeyShift',
  lanes: [
    {
      label: 'Admitted key',
      nodes: [
        { title: 'Application', sub: 'calls client.Get(ctx, key)' },
        { title: 'KeyShift SDK', sub: 'key is admitted to the cache', accent: true },
        { title: 'Local cache', sub: 'serve from memory or fill from Redis on a miss' },
      ],
    },
    {
      label: 'Any other key',
      nodes: [
        { title: 'Application', sub: 'calls client.Get(ctx, key)' },
        { title: 'KeyShift SDK', sub: 'key is not admitted; count the read', accent: true },
        { title: 'Redis', sub: 'serve the GET directly' },
      ],
    },
    {
      label: 'Key changes',
      tone: 'accent',
      nodes: [
        { title: 'Another writer', sub: 'SET, DEL or expiry' },
        { title: 'Redis client tracking', sub: 'tracks admitted keys only' },
        { title: 'Local copy removed', sub: 'fetch the new value on the next read' },
      ],
    },
    {
      label: 'Every window',
      note: '10 s by default',
      nodes: [
        { title: 'Read and write rates', sub: 'from the detector' },
        { title: 'Admission', sub: 'hit ratio, value size, memory budget', accent: true },
        { title: 'Admitted set', sub: 'admit, keep or cool down a key' },
      ],
    },
    {
      label: 'Fleet',
      note: 'optional',
      tone: 'quiet',
      nodes: [
        { title: 'Telemetry', sub: 'sent roughly every 30 s; keys use HMAC fingerprints', dashed: true },
        { title: 'Controller', sub: 'ranks hot keys across instances', dashed: true },
        { title: 'Policies', sub: 'can only tighten local limits', dashed: true },
      ],
    },
  ],
  legend: { accent: 'invalidation', quiet: 'optional, off the request path' },
};

export const locklensFlow: Flow = {
  id: 'locklens',
  title: 'How data moves through LockLens',
  lanes: [
    {
      label: 'Collect',
      nodes: [
        { title: 'PostgreSQL instances', sub: 'read-only role, pg_read_all_stats' },
        { title: 'Collectors', sub: 'one worker per instance, global concurrency limit', accent: true },
        { title: 'Monitoring store', sub: 'PostgreSQL or TimescaleDB, via a bounded write queue' },
      ],
    },
    {
      label: 'Explain',
      nodes: [
        { title: 'In-memory state', sub: 'latest values and recent history' },
        { title: 'Rules + incident recorder', sub: 'evaluate 18 evidence-based rules', accent: true },
        { title: 'Incidents and alerts', sub: 'evidence, timeline, notifications' },
      ],
    },
    {
      label: 'Serve',
      nodes: [
        { title: 'Live state + store', sub: 'live values and history' },
        { title: 'REST API + SSE', sub: 'events notify the UI of changes', accent: true },
        { title: 'Web UI', sub: 'React, served by nginx' },
      ],
    },
    {
      label: 'CLI',
      tone: 'quiet',
      nodes: [
        { title: 'One database', sub: 'no server needed', dashed: true },
        { title: 'Shared collectors', sub: 'build the blocking graph and report', dashed: true },
        { title: 'Terminal report', sub: 'doctor, inspect, watch, snapshot', dashed: true },
      ],
    },
  ],
  legend: { quiet: 'standalone command line' },
};

export const extendpadFlow: Flow = {
  id: 'extendpad',
  title: 'From Mac to tablet',
  lanes: [
    {
      label: 'On the Mac',
      nodes: [
        { title: 'Virtual display', sub: 'CGVirtualDisplay creates a monitor in macOS', accent: true },
        { title: 'Capture', sub: 'ScreenCaptureKit captures changes' },
        { title: 'Encode', sub: 'hardware H.264 encoding with VideoToolbox' },
      ],
    },
    {
      label: 'Over USB-C',
      nodes: [
        { title: 'Loopback server', sub: 'listens on 127.0.0.1 only' },
        { title: 'adb reverse', sub: 'sends the connection over USB', accent: true },
        { title: 'Paired session', sub: 'HMAC-SHA256 with a token sent over ADB' },
      ],
    },
    {
      label: 'On the tablet',
      nodes: [
        { title: 'Receive', sub: 'control and video sockets' },
        { title: 'Decode', sub: 'hardware decoding with MediaCodec', accent: true },
        { title: 'Display', sub: 'letterboxed to preserve proportions' },
      ],
    },
    {
      label: 'Pointer',
      tone: 'accent',
      nodes: [
        { title: 'Cursor position', sub: 'read on the Mac' },
        { title: 'Control channel', sub: '120 Hz, separate from video' },
        { title: 'Tablet cursor', sub: 'drawn independently of video frames' },
      ],
    },
  ],
  legend: { accent: 'separate pointer channel' },
};
