// ============================================================================
// UNICODE GRADE-1 BRAILLE TRANSLATOR (For "Flat-Screen Accessible for Blind People")
// ============================================================================
export const BRAILLE_MAP = {
  a: '⠁', b: '⠃', c: '⠉', d: '⠙', e: '⠑', f: '⠋', g: '⠛', h: '⠓', i: '⠊', j: '⠚',
  k: '⠅', l: '⠇', m: '⠍', n: '⠝', o: '⠕', p: '⠏', q: '⠟', r: '⠗', s: '⠎', t: '⠞',
  u: '⠥', v: '⠧', w: '⠺', x: '⠭', y: '⠽', z: '⠵',
  '0': '⠴', '1': '⠂', '2': '⠆', '3': '⠒', '4': '⠲', '5': '⠢', '6': '⠖', '7': '⠶', '8': '⠦', '9': '⠔',
  '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', ':': '⠒', ';': '⠆', '-': '⠤', '(': '⠐⠣', ')': '⠐⠜',
  '"': '⠶', "'": '⠄', '/': '⠌', '%': '⠨⠴', '&': '⠯', '+': '⠬', '=': '⠶', '#': '⠼', ' ': ' '
};

export function toBraille(input) {
  if (input === null || input === undefined) return '';
  const str = String(input);
  let out = '';
  for (const ch of str) {
    const lower = ch.toLowerCase();
    if (BRAILLE_MAP[lower] !== undefined) {
      out += BRAILLE_MAP[lower];
    } else {
      out += ch;
    }
  }
  return out;
}
