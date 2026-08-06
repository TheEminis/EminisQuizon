import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


export const useUserStats = (uid) => {
  const [stats, setStats] = useState({
    testsTaken: 0,
    correctAnswers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setStats({
          testsTaken: data.testsTaken || 0,
          correctAnswers: data.correctAnswers || 0,
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { stats, loading };
};