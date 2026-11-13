// Pure helper: turn a Claude reply into idea cards. No DOM, no network — unit-testable.
// The model reply is UNTRUSTED input, so this is the validation boundary: parse
// defensively, normalize every field, and clamp topic to the known enum.
export const TOPICS = ["Personal Development","Productivity","Psychology","Habits","Health","Money","Communication","Learning","Motivation","General"];
const TOPIC_SET = new Set(TOPICS.map(t => t.toLowerCase()));

export function extractIdeas(text) {
  if (typeof text !== 'string') return [];
  let s = text.trim();
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i); // strip ```json ... ``` if present
  if (fence) s = fence[1].trim();
  const start = s.indexOf('[');
  const end = s.lastIndexOf(']');
  if (start === -1 || end === -1 || end < start) return [];
  let arr;
  try { arr = JSON.parse(s.slice(start, end + 1)); } catch { return []; }
  if (!Array.isArray(arr)) return [];
  return arr
    .filter(o => o && typeof o === 'object')
    .map(o => ({
      idea: String(o.idea ?? o.title ?? '').trim().slice(0, 140),
      detail: String(o.detail ?? o.insight ?? o.body ?? '').trim().slice(0, 600),
      topic: normalizeTopic(o.topic),
    }))
    .filter(o => o.idea);
}

// Map whatever the model returned to one of the allowed topics (default General).
function normalizeTopic(raw) {
  const t = String(raw ?? '').trim();
  if (!t) return 'General';
  const hit = TOPICS.find(x => x.toLowerCase() === t.toLowerCase());
  return hit || 'General';
}
