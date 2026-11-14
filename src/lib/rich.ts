const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapes text, then turns **emphasis** into <strong>. Content is authored in src/data/cv.ts. */
export function rich(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ESC[c]).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
