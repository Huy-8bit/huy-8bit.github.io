// Builds a path under the configured base (BASE_PATH in CI, "/" by default).
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const url = (path = '') => base + path.replace(/^\//, '');
