// Per-visitor high scores. Storage can be missing (private mode), so every
// access is guarded and the games still work without it.
export function readScore(key) {
  try {
    return Number(localStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
}

export function saveScore(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch {}
}
