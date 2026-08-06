// src/utils/localStats.js
//
// Aggregate "tests taken / correct / wrong answer" counters, cached in
// localStorage. Firestore used to be the *only* place these numbers lived,
// which meant:
//   - Guests (no uid) never got anything saved at all -> always showed 0.
//   - Logged-in users saw the numbers flash to 0 on every refresh while
//     waiting for Firestore to respond, and stayed at 0 if that request
//     ever failed.
// Keeping a local copy per user (keyed by uid, or "guest" when signed out)
// means the header can show the right numbers instantly, every time.

const DEFAULT_STATS = { testsTaken: 0, correctAnswers: 0 };

const isBrowser = typeof window !== 'undefined' && !!window.localStorage;

const keyFor = (uid) => `emq_stats_${uid || 'guest'}`;

export const readLocalStats = (uid) => {
  if (!isBrowser) return DEFAULT_STATS;
  try {
    const raw = window.localStorage.getItem(keyFor(uid));
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : DEFAULT_STATS;
  } catch (err) {
    console.warn('localStats: could not read stats', err);
    return DEFAULT_STATS;
  }
};

export const writeLocalStats = (uid, stats) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(keyFor(uid), JSON.stringify(stats));
  } catch (err) {
    console.warn('localStats: could not save stats', err);
  }
};

// Adds one completed test's result to the running local total and returns
// the updated totals.
export const addLocalTestResult = (uid, correctCount, totalCount) => {
  const current = readLocalStats(uid);
  const updated = {
    testsTaken: current.testsTaken + 1,
    correctAnswers: current.correctAnswers + correctCount,
  };
  writeLocalStats(uid, updated);
  return updated;
};

export { DEFAULT_STATS };