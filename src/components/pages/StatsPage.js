// src/components/pages/StatsPage.js
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import { getInitials, getAvatarColor } from '../../utils/avatar';
import {
  TYPE_META,
  readLocalAttempts,
  mergeAttempts,
  computeSummary,
  computeByType,
  computeLastDays,
  dayKey,
} from '../../utils/attemptHistory';

const PAGE_SIZE = 15;

const formatDay = (ts) => {
  const today = dayKey(Date.now());
  const yest = dayKey(Date.now() - 86400000);
  const k = dayKey(ts);
  if (k === today) return 'Today';
  if (k === yest) return 'Yesterday';
  return new Date(ts).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

const StatsPage = () => {
  const { currentUser, stats } = useAuth();
  const uid = currentUser?.uid;

  const [local] = useState(() => readLocalAttempts(uid));
  const [remote, setRemote] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all');
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    if (!uid) return undefined;
    const q = query(collection(db, 'users', uid, 'attempts'), orderBy('at', 'desc'), limit(300));
    return onSnapshot(
      q,
      (snap) => {
        setRemote(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
        setError(false);
      },
      (err) => {
        console.error('Statistika oxunmadı:', err);
        setError(true);
        setLoading(false);
      }
    );
  }, [uid]);

  const attempts = useMemo(() => mergeAttempts(remote, local), [remote, local]);
  const summary = useMemo(() => computeSummary(attempts), [attempts]);
  const byType = useMemo(() => computeByType(attempts), [attempts]);
  const days = useMemo(() => computeLastDays(attempts, 14), [attempts]);
  const maxDay = Math.max(1, ...days.map((d) => d.count));

  const filtered = filter === 'all' ? attempts : attempts.filter((a) => a.type === filter);
  const shown = filtered.slice(0, visible);

  // Group the visible rows by day
  const groups = [];
  shown.forEach((a) => {
    const k = dayKey(a.at);
    const last = groups[groups.length - 1];
    if (last && last.key === k) last.items.push(a);
    else groups.push({ key: k, ts: a.at, items: [a] });
  });

  const displayName = currentUser?.displayName || currentUser?.email || 'User';
  const olderTests = Math.max(0, (stats?.testsTaken || 0) - attempts.length);

  return (
    <div className="quiz-container stats-container">
      <div className="stats-hero">
        <span className="profile-avatar profile-avatar-lg" style={{ background: getAvatarColor(uid) }}>
          {getInitials(currentUser?.displayName, currentUser?.email)}
        </span>
        <div>
          <h2>My Statistics</h2>
          <p className="quiz-instruction">{displayName}</p>
        </div>
      </div>

      {attempts.length === 0 && !loading ? (
        <div className="leaderboard-status">
          No activity yet. Take a <Link to="/quiz">Quiz</Link> or the <Link to="/level-test">Level Test</Link> and
          your progress will appear here.
        </div>
      ) : (
        <>
          <div className="stats-cards">
            <div className="stats-card"><span className="stats-num">{summary.tests}</span><span>Tests taken</span></div>
            <div className="stats-card"><span className="stats-num">{summary.accuracy}%</span><span>Accuracy</span></div>
            <div className="stats-card"><span className="stats-num">{summary.correct}</span><span>Correct answers</span></div>
            <div className="stats-card"><span className="stats-num">{summary.wrong}</span><span>Wrong answers</span></div>
            <div className="stats-card"><span className="stats-num">{summary.activeDays}</span><span>Active days</span></div>
            <div className="stats-card"><span className="stats-num">{summary.streak} 🔥</span><span>Day streak</span></div>
          </div>

          {olderTests > 0 && (
            <p className="stats-note">
              {olderTests} earlier test{olderTests > 1 ? 's were' : ' was'} taken before detailed history was
              enabled, so they are counted in your totals but not listed below.
            </p>
          )}

          <h3 className="stats-title">Last 14 days</h3>
          <div className="stats-chart" role="img" aria-label="Tests taken per day over the last 14 days">
            {days.map((d) => (
              <div key={d.key} className="stats-bar-col" title={`${d.date.toLocaleDateString()}: ${d.count} test(s)`}>
                <span className="stats-bar-count">{d.count || ''}</span>
                <div className="stats-bar" style={{ height: `${(d.count / maxDay) * 100}%` }} />
                <span className="stats-bar-day">{d.date.getDate()}</span>
              </div>
            ))}
          </div>

          <h3 className="stats-title">By category</h3>
          <div className="stats-types">
            {byType.map((t) => (
              <div key={t.type} className="stats-type-row">
                <span className="stats-type-name">{TYPE_META[t.type].icon} {TYPE_META[t.type].label}</span>
                <div className="stats-progress"><div style={{ width: `${t.accuracy}%` }} /></div>
                <span className="stats-type-val">{t.tests ? `${t.accuracy}% · ${t.tests}` : '—'}</span>
              </div>
            ))}
          </div>

          <h3 className="stats-title">History</h3>
          <div className="stats-filters">
            {['all', ...Object.keys(TYPE_META)].map((t) => (
              <button
                key={t}
                type="button"
                className={`stats-filter ${filter === t ? 'active' : ''}`}
                onClick={() => { setFilter(t); setVisible(PAGE_SIZE); }}
              >
                {t === 'all' ? 'All' : TYPE_META[t].label}
              </button>
            ))}
          </div>

          {groups.map((g) => (
            <div key={g.key} className="stats-day">
              <div className="stats-day-label">{formatDay(g.ts)}</div>
              {g.items.map((a) => {
                const pct = a.total ? Math.round((a.correct / a.total) * 100) : 0;
                return (
                  <div key={a.id} className="stats-row">
                    <span className="stats-row-icon">{TYPE_META[a.type]?.icon || '📝'}</span>
                    <span className="stats-row-main">
                      <span className="stats-row-title">{a.label}</span>
                      <span className="stats-row-time">{formatTime(a.at)}</span>
                    </span>
                    <span className="stats-row-score">
                      {a.correct}/{a.total}
                      <span className={`stats-pct ${pct >= 75 ? 'good' : pct >= 50 ? 'mid' : 'low'}`}>{pct}%</span>
                    </span>
                  </div>
                );
              })}
            </div>
          ))}

          {filtered.length === 0 && <div className="leaderboard-status">Nothing in this category yet.</div>}

          {filtered.length > visible && (
            <button type="button" className="submit-btn" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Show more
            </button>
          )}
        </>
      )}

      {loading && attempts.length === 0 && <div className="leaderboard-status">Loading…</div>}
      {error && (
        <div className="alert alert-error">
          Cloud history couldn't be loaded; showing what is saved on this device.
        </div>
      )}
    </div>
  );
};

export default StatsPage;
