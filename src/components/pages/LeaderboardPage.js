// src/components/pages/LeaderboardPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import { getInitials, getAvatarColor } from '../../utils/avatar';
import { CEFR_LABELS } from '../../data/levelTestData';

const MEDALS = ['🥇', '🥈', '🥉'];

const LeaderboardPage = () => {
  const { currentUser } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Realtime, Firestore-backed leaderboard - this is what keeps it visible
  // and up to date after a refresh (it never depends on local component
  // state that would be lost on reload).
  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('levelTestBestPercentage', 'desc'), limit(50));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((docSnap) => ({ uid: docSnap.id, ...docSnap.data() }));
        setRows(list);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Leaderboard oxunmadı:', err);
        setError(err);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  return (
    <div className="quiz-container leaderboard-container">
      <h2>Leaderboard</h2>
      <p className="quiz-instruction">
        Ranked by best Level Test score. Take the{' '}
        <Link to="/level-test">Level Test</Link> to claim your spot - your rank updates live and
        stays here even after a refresh.
      </p>

      {loading && <div className="leaderboard-status">Loading leaderboard…</div>}

      {!loading && error && (
        <div className="alert alert-error">
          The leaderboard couldn't be loaded right now. This usually means the Firestore security
          rules for the <code>users</code> collection don't yet allow signed-in users to read
          other players' scores. Please try again shortly, or check the project's Firestore rules.
        </div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div className="leaderboard-status">
          No scores yet. Be the first to take the <Link to="/level-test">Level Test</Link>!
        </div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="leaderboard-table">
          <div className="leaderboard-row leaderboard-head">
            <span className="lb-rank">#</span>
            <span className="lb-player">Player</span>
            <span className="lb-level">Level</span>
            <span className="lb-score">Score</span>
            <span className="lb-ielts">IELTS</span>
          </div>

          {rows.map((row, index) => {
            const isMe = currentUser && row.uid === currentUser.uid;
            const name = row.displayName || 'İstifadəçi';
            return (
              <div
                key={row.uid}
                className={`leaderboard-row ${isMe ? 'leaderboard-row-me' : ''}`}
              >
                <span className="lb-rank">{MEDALS[index] || index + 1}</span>
                <span className="lb-player">
                  <span
                    className="profile-avatar"
                    style={{ background: getAvatarColor(row.uid) }}
                  >
                    {getInitials(row.displayName, row.email)}
                  </span>
                  <span className="lb-player-name">
                    {name} {isMe && <span className="lb-you-tag">You</span>}
                  </span>
                </span>
                <span className="lb-level">
                  <span className="quiz-level-badge lb-level-badge">{row.levelTestBestBand}</span>
                  <span className="lb-level-label">{CEFR_LABELS[row.levelTestBestBand] || ''}</span>
                </span>
                <span className="lb-score">
                  {row.levelTestBestScore}/{row.levelTestBestTotal}{' '}
                  <span className="lb-percentage">({row.levelTestBestPercentage}%)</span>
                </span>
                <span className="lb-ielts">{row.levelTestBestIelts ?? '-'}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
