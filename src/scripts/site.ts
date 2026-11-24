// Site-wide behaviour: reveals, count-ups, pointer lighting, section colours,
// scroll progress, pausing off-screen animation, copy buttons.
import { motionOn, watch, onceVisible } from './motion';

const root = document.documentElement;

// Reveals: fade/translate, masks and staggered children.
const revealables = document.querySelectorAll<HTMLElement>('.reveal, .reveal-mask, .stagger, .heading-reveal');
document.querySelectorAll<HTMLElement>('.stagger').forEach((g) =>
  [...g.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i))),
);
if (!('IntersectionObserver' in window) || !motionOn()) {
  revealables.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealables.forEach((el) => io.observe(el));
}

// Count-ups. The final value is already in the HTML; this only animates towards it.
document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
  const to = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals ?? 0);
  if (!Number.isFinite(to) || !motionOn()) return;
  const final = el.textContent;
  onceVisible(el, () => {
    const start = performance.now();
    const dur = 1400;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (to * eased).toFixed(decimals);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = final;
    };
    requestAnimationFrame(step);
  });
});

// Pointer lighting on .lit panels and primary buttons (fine pointers only).
if (window.matchMedia('(pointer: fine)').matches) {
  let raf = 0;
  let evt: PointerEvent | null = null;
  document.addEventListener(
    'pointermove',
    (e) => {
      evt = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!evt) return;
        const target = evt.target as Element;
        const lit = target.closest?.<HTMLElement>('.lit');
        if (lit) {
          const r = lit.getBoundingClientRect();
          lit.style.setProperty('--mx', `${evt.clientX - r.left}px`);
          lit.style.setProperty('--my', `${evt.clientY - r.top}px`);
        }
        const btn = target.closest?.<HTMLElement>('.btn-primary');
        if (btn) {
          const r = btn.getBoundingClientRect();
          btn.style.setProperty('--bx', `${((evt.clientX - r.left) / r.width) * 100}%`);
        }
      });
    },
    { passive: true },
  );
}

// Page backdrop colour follows the section in view.
const zones = document.querySelectorAll<HTMLElement>('[data-zone]');
if (zones.length && 'IntersectionObserver' in window) {
  const zio = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) root.dataset.zone = (e.target as HTMLElement).dataset.zone;
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  zones.forEach((z) => zio.observe(z));
}

// Scroll progress (under the header).
const header = document.querySelector<HTMLElement>('[data-header]');
if (header) {
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.style.setProperty('--progress', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    });
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Anything marked [data-anim] pauses its CSS and SMIL animation when off screen,
// when the tab is hidden, or when motion is off.
document.querySelectorAll<HTMLElement>('[data-anim]').forEach((el) => {
  const svgs = el.querySelectorAll<SVGSVGElement>('svg[data-smil]');
  watch(el, (active) => {
    el.classList.toggle('is-offscreen', !active);
    svgs.forEach((s) => (active ? s.unpauseAnimations() : s.pauseAnimations()));
  });
});

// Diagrams that scroll sideways on small screens become focusable, labelled regions only while they overflow.
const scrollers = document.querySelectorAll<HTMLElement>('[data-scroll-x]');
const markScroll = () =>
  scrollers.forEach((el) => {
    const over = el.scrollWidth > el.clientWidth + 1;
    if (over) {
      el.tabIndex = 0;
      el.setAttribute('role', 'region');
      el.setAttribute('aria-label', el.dataset.label ?? 'Diagram');
    } else {
      el.removeAttribute('tabindex');
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
    }
  });
if (scrollers.length) {
  markScroll();
  window.addEventListener('resize', markScroll, { passive: true });
}

// Copy buttons on code blocks.
document.addEventListener('click', async (e) => {
  const btn = (e.target as Element).closest<HTMLButtonElement>('[data-copy-target]');
  if (!btn) return;
  const pre = document.getElementById(btn.dataset.copyTarget ?? '')?.querySelector('pre');
  if (!pre) return;
  try {
    await navigator.clipboard.writeText(pre.innerText);
    btn.classList.add('is-done');
    const label = btn.querySelector('[data-copy-label]');
    if (label) label.textContent = 'Copied';
    window.setTimeout(() => {
      btn.classList.remove('is-done');
      if (label) label.textContent = 'Copy';
    }, 1600);
  } catch {
    /* clipboard unavailable: nothing to do */
  }
});
