// One place that decides whether something may move right now:
// the visitor's motion setting, whether the tab is visible, and whether the element is on screen.
const root = document.documentElement;

export const motionOn = () => root.dataset.motion !== 'reduced';

/** Calls `cb(true)` when `el` is on screen, the tab is visible and motion is on; `cb(false)` otherwise. */
export function watch(el: Element, cb: (active: boolean) => void, margin = '120px'): () => void {
  let onScreen = false;
  let last: boolean | null = null;
  const update = () => {
    const active = onScreen && !document.hidden && motionOn();
    if (active !== last) {
      last = active;
      cb(active);
    }
  };
  const io = new IntersectionObserver(
    (entries) => {
      onScreen = entries.some((e) => e.isIntersecting);
      update();
    },
    { rootMargin: margin },
  );
  io.observe(el);
  document.addEventListener('visibilitychange', update);
  document.addEventListener('motionchange', update);
  return () => {
    io.disconnect();
    document.removeEventListener('visibilitychange', update);
    document.removeEventListener('motionchange', update);
  };
}

/** Runs once when `el` first comes into view. */
export function onceVisible(el: Element, cb: () => void, threshold = 0.25) {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        cb();
      }
    },
    { threshold },
  );
  io.observe(el);
}
