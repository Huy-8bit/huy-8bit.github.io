// Flow-lane diagrams. Each lane is one path through the system, read left to right.
// Every node comes from the project's own architecture docs (see ./projects.ts for sources).

export type FlowNode = { title: string; sub?: string; code?: boolean; accent?: boolean; dashed?: boolean };
export type Lane = { label: string; note?: string; tone?: 'accent' | 'quiet'; nodes: FlowNode[] };
export type Flow = { id: string; title: string; lanes: Lane[]; legend?: { accent?: string; quiet?: string } };

export const keyshiftFlow: Flow = {
  id: 'keyshift',
  title: 'How a read moves through KeyShift',
  lanes: [
    {
      label: 'Admitted key',
      nodes: [
        { title: 'Your code', sub: 'calls client.Get(ctx, key)' },
        { title: 'KeyShift SDK', sub: 'key is in the admitted set', accent: true },
        { title: 'Local cache', sub: 'value from process memory; a miss fills from Redis' },
      ],
    },
    {
      label: 'Any other key',
      nodes: [
        { title: 'Your code', sub: 'calls client.Get(ctx, key)' },
        { title: 'KeyShift SDK', sub: 'not admitted; the detector counts the read', accent: true },
        { title: 'Redis', sub: 'a normal GET, as before' },
      ],
    },
    {
      label: 'Key changes',
      tone: 'accent',
      nodes: [
        { title: 'Another writer', sub: 'SET, DEL or expiry' },
        { title: 'Redis client tracking', sub: 'tracks admitted keys only' },
        { title: 'Local copy dropped', sub: 'next read fetches the new value' },
      ],
    },
    {
      label: 'Every window',
      note: '10 s by default',
      nodes: [
        { title: 'Read and write rates', sub: 'from the detector' },
        { title: 'Admission', sub: 'hit ratio, value size, memory budget', accent: true },
        { title: 'Admitted set', sub: 'admit, keep, or cool down' },
      ],
    },
    {
      label: 'Fleet',
      note: 'optional',
      tone: 'quiet',
      nodes: [
        { title: 'Telemetry', sub: 'about every 30 s, keys as HMAC fingerprints', dashed: true },
        { title: 'Controller', sub: 'ranks hot keys across instances', dashed: true },
        { title: 'Policies', sub: 'can only tighten local limits', dashed: true },
      ],
    },
  ],
  legend: { accent: 'invalidation', quiet: 'optional, off the request path' },
};

export const locklensFlow: Flow = {
  id: 'locklens',
  title: 'How LockLens collects, explains and serves',
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
        { title: 'Rules + incident recorder', sub: '18 evidence-based rules', accent: true },
        { title: 'Incidents and alerts', sub: 'evidence, timeline, notifications' },
      ],
    },
    {
      label: 'Serve',
      nodes: [
        { title: 'Live state + store', sub: 'live values and history' },
        { title: 'REST API + SSE', sub: 'events tell the UI what changed', accent: true },
        { title: 'Web UI', sub: 'React, served by nginx' },
      ],
    },
    {
      label: 'CLI',
      tone: 'quiet',
      nodes: [
        { title: 'One database', sub: 'no server needed', dashed: true },
        { title: 'Same collectors', sub: 'same blocking graph and report', dashed: true },
        { title: 'Terminal report', sub: 'doctor, inspect, watch, snapshot', dashed: true },
      ],
    },
  ],
  legend: { quiet: 'standalone command line' },
};

export const extendpadFlow: Flow = {
  id: 'extendpad',
  title: 'How a frame gets from the Mac to the tablet',
  lanes: [
    {
      label: 'On the Mac',
      nodes: [
        { title: 'Virtual display', sub: 'CGVirtualDisplay, a real monitor to macOS', accent: true },
        { title: 'Capture', sub: 'ScreenCaptureKit, only when something changes' },
        { title: 'Encode', sub: 'VideoToolbox H.264, in hardware' },
      ],
    },
    {
      label: 'Over USB-C',
      nodes: [
        { title: 'Loopback server', sub: 'listens on 127.0.0.1 only' },
        { title: 'adb reverse', sub: 'carries the socket over the cable', accent: true },
        { title: 'Paired session', sub: 'HMAC-SHA256 with a token sent over ADB' },
      ],
    },
    {
      label: 'On the tablet',
      nodes: [
        { title: 'Receive', sub: 'control and video sockets' },
        { title: 'Decode', sub: 'MediaCodec, in hardware', accent: true },
        { title: 'Show', sub: 'letterboxed, never stretched' },
      ],
    },
    {
      label: 'Pointer',
      tone: 'accent',
      nodes: [
        { title: 'Cursor position', sub: 'read on the Mac' },
        { title: 'Control channel', sub: '120 Hz, separate from video' },
        { title: 'Drawn by the tablet', sub: 'never waits for a frame' },
      ],
    },
  ],
  legend: { accent: 'separate pointer channel' },
};
