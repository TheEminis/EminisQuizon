// src/utils/attemptHistory.js
//
// Per-user history of every completed test ("what was done, and when").
// A local copy is kept in localStorage so the Statistics page opens
// instantly and keeps working offline; Firestore (users/{uid}/attempts)
// is the durable copy that follows the user across devices.

const MAX_LOCAL = 300;
const isBrowser = typeof window !== 'undefined' && !!window.localStorage;
const keyFor = (uid) => `emq_history_${uid || 'guest'}`;

export const TYPE_META = {
  quiz: { label: 'Quiz', icon: '📝' },
  voca: { label: 'Vocabulary', icon: '📖' },
  reading: { label: 'Reading', icon: '📕' },
  listening: { label: 'Listening', icon: '🎧' },
  level: { label: 'Level Test', icon: '🎯' },
};

export const newAttempt = (correct, total, meta = {}) => ({
  id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
  type: TYPE_META[meta.type] ? meta.type : 'quiz',
  label: String(meta.label || TYPE_META[meta.type]?.label || 'Test').slice(0, 120),
  correct,
  total,
  at: Date.now(),
});

export const readLocalAttempts = (uid) => {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(keyFor(uid));
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (err) {
    return [];
  }
};

export const addLocalAttempt = (uid, attempt) => {
  if (!isBrowser) return;
  try {
    const next = [attempt, ...readLocalAttempts(uid)].slice(0, MAX_LOCAL);
    window.localStorage.setItem(keyFor(uid), JSON.stringify(next));
  } catch (err) {
    console.warn('attemptHistory: could not save', err);
  }
};

// Merge local + remote lists by id, newest first.
export const mergeAttempts = (...lists) => {
  const map = new Map();
  lists.flat().forEach((a) => {
    if (a && a.id && !map.has(a.id)) map.set(a.id, a);
  });
  return [...map.values()].sort((a, b) => b.at - a.at);
};

// ---- Aggregations used by the Statistics page ----

export const dayKey = (ts) => {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const computeSummary = (attempts) => {
  const totalQ = attempts.reduce((s, a) => s + a.total, 0);
  const correct = attempts.reduce((s, a) => s + a.correct, 0);
  const days = new Set(attempts.map((a) => dayKey(a.at)));

  // Streak: consecutive active days ending today (or yesterday).
  let streak = 0;
  const cursor = new Date();
  if (!days.has(dayKey(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1);
  while (days.has(dayKey(cursor.getTime()))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    tests: attempts.length,
    correct,
    wrong: totalQ - correct,
    accuracy: totalQ ? Math.round((correct / totalQ) * 100) : 0,
    activeDays: days.size,
    streak,
  };
};

export const computeByType = (attempts) =>
  Object.keys(TYPE_META).map((type) => {
    const list = attempts.filter((a) => a.type === type);
    const q = list.reduce((s, a) => s + a.total, 0);
    const c = list.reduce((s, a) => s + a.correct, 0);
    return { type, tests: list.length, accuracy: q ? Math.round((c / q) * 100) : 0 };
  });

// Last `n` days (oldest -> newest) with the number of tests per day.
export const computeLastDays = (attempts, n = 14) => {
  const counts = {};
  attempts.forEach((a) => {
    const k = dayKey(a.at);
    counts[k] = (counts[k] || 0) + 1;
  });
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({ key: dayKey(d.getTime()), date: d, count: counts[dayKey(d.getTime())] || 0 });
  }
  return out;
};
