// src/context/AuthContext.js
import React, { createContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, onSnapshot, increment, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { readLocalStats, writeLocalStats, addLocalTestResult, DEFAULT_STATS } from "../utils/localStats";

const isBrowser = typeof window !== "undefined" && !!window.localStorage;
const levelResultKey = (uid) => `emq_level_result_${uid || "guest"}`;

const readLocalLevelResult = (uid) => {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(levelResultKey(uid));
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
};

const writeLocalLevelResult = (uid, result) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(levelResultKey(uid), JSON.stringify(result));
  } catch (err) {
    // ignore
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined); // undefined = yüklənir, null = giriş yoxdur
  const [stats, setStats] = useState(DEFAULT_STATS);
  // Statistika Firestore-dan hələ gəlməyib - bunu bilmək lazımdır ki,
  // "0" rəqəmini həqiqi məlumat kimi yox, yüklənmə anı kimi göstərək.
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  // Səviyyə testinin ən yaxşı nəticəsi (leaderboard-da göstərilən eyni
  // dəyər). localStorage-a keşlənir ki, refresh zamanı itməsin.
  const [levelResult, setLevelResult] = useState(() =>
    isBrowser ? JSON.parse(window.localStorage.getItem(levelResultKey(null)) || "null") : null
  );

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
      if (!user) {
        // Qonaq (giriş etməmiş) istifadəçi - bu brauzerdə əvvəl
        // saxlanmış qonaq statistikasını göstər, sıfır yox.
        setStats(readLocalStats(null));
        setIsStatsLoading(false);
        setLevelResult(readLocalLevelResult(null));
      }
    });
    return unsubAuth;
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    // Firestore-dan cavab gələnə qədər localStorage-dakı keşlənmiş
    // rəqəmləri dərhal göstər - bununla header heç vaxt "0"-a düşməyəcək
    // və şəbəkə problemi olsa belə son bilinən rəqəmlər qalacaq.
    setStats(readLocalStats(currentUser.uid));
    setIsStatsLoading(true);
    setLevelResult(readLocalLevelResult(currentUser.uid));

    const userRef = doc(db, "users", currentUser.uid);
    const unsubSnap = onSnapshot(
      userRef,
      (snap) => {
        const cachedLocal = readLocalStats(currentUser.uid);
        const fromFirestore = snap.exists()
          ? {
              testsTaken: snap.data().testsTaken || 0,
              correctAnswers: snap.data().correctAnswers || 0,
            }
          : DEFAULT_STATS;

        // Firestore is eventually consistent (and can be behind right
        // after a write, or fail silently due to rules/network issues).
        // Never let it visually "undo" a result the user just saw locally
        // - always keep the higher of the two per field, then re-sync
        // local storage to match so both stay in agreement.
        const merged = {
          testsTaken: Math.max(fromFirestore.testsTaken, cachedLocal.testsTaken),
          correctAnswers: Math.max(fromFirestore.correctAnswers, cachedLocal.correctAnswers),
        };
        setStats(merged);
        writeLocalStats(currentUser.uid, merged);
        setIsStatsLoading(false);

        // Səviyyə testinin ən yaxşı nəticəsini də eyni məntiqlə saxla:
        // Firestore-dakı və yerli keşdəki nəticələrdən faizi daha yüksək
        // olanı göstər, sonra ikisini sinxronlaşdır.
        if (snap.exists() && snap.data().levelTestBestPercentage != null) {
          const fsLevel = {
            percentage: snap.data().levelTestBestPercentage,
            score: snap.data().levelTestBestScore,
            total: snap.data().levelTestBestTotal,
            band: snap.data().levelTestBestBand,
            ieltsBand: snap.data().levelTestBestIelts,
          };
          const cachedLevel = readLocalLevelResult(currentUser.uid);
          const betterLevel =
            !cachedLevel || fsLevel.percentage >= cachedLevel.percentage ? fsLevel : cachedLevel;
          setLevelResult(betterLevel);
          writeLocalLevelResult(currentUser.uid, betterLevel);
        }
      },
      (err) => {
        console.error("Profil statistikası oxunmadı:", err);
        setIsStatsLoading(false);
        // Xəta olsa belə local keşdəki son bilinən rəqəmləri saxlayırıq,
        // sıfırlamırıq.
      }
    );

    return unsubSnap;
  }, [currentUser]);

  const logout = () => signOut(auth);

  // Bir testin nəticəsini qeyd edir. HƏMİŞƏ localStorage-a yazır (giriş
  // olsun-olmasın, refresh-dən sonra da qalsın deyə) və ekranı dərhal
  // yeniləyir; əlavə olaraq, giriş edilibsə, Firestore-a da yazır.
  const recordResult = useCallback((correctCount, totalCount) => {
    const uid = currentUser?.uid || null;
    const updatedLocal = addLocalTestResult(uid, correctCount, totalCount);
    setStats(updatedLocal);

    if (uid) {
      const userRef = doc(db, "users", uid);
      setDoc(
        userRef,
        {
          testsTaken: increment(1),
          correctAnswers: increment(correctCount),
          lastTestAt: serverTimestamp(),
        },
        { merge: true }
      ).catch((err) => {
        console.error("Test statistikası Firestore-a saxlanılmadı:", err);
      });
    }
  }, [currentUser]);

  // Səviyyə (level) testinin nəticəsini qeyd edir. Nəticə HƏMİŞƏ
  // localStorage-a yazılır (refresh-dən sonra da qalsın deyə). Giriş
  // edilibsə, həm də Firestore-dakı "users/{uid}" sənədinə yazılır ki,
  // Leaderboard səhifəsi bütün istifadəçilərin ən yaxşı nəticəsini
  // oxuya bilsin. Yalnız yeni nəticə əvvəlkindən yaxşıdırsa "best"
  // sahələri yenilənir - əks halda köhnə ən yaxşı nəticə qorunur.
  const recordLevelTestResult = useCallback(
    async (result) => {
      const uid = currentUser?.uid || null;

      const cached = readLocalLevelResult(uid);
      const isNewBest = !cached || result.percentage >= cached.percentage;
      const bestToStore = isNewBest ? result : cached;
      writeLocalLevelResult(uid, bestToStore);
      setLevelResult(bestToStore);

      if (!uid) return;

      try {
        const userRef = doc(db, "users", uid);
        const snap = await getDoc(userRef);
        const prevBestPercentage = snap.exists() ? snap.data().levelTestBestPercentage : undefined;
        const isNewFirestoreBest = prevBestPercentage == null || result.percentage >= prevBestPercentage;

        await setDoc(
          userRef,
          {
            displayName: currentUser.displayName || currentUser.email || "İstifadəçi",
            levelTestLastPercentage: result.percentage,
            levelTestLastBand: result.band,
            levelTestLastAt: serverTimestamp(),
            levelTestAttempts: increment(1),
            ...(isNewFirestoreBest
              ? {
                  levelTestBestPercentage: result.percentage,
                  levelTestBestScore: result.score,
                  levelTestBestTotal: result.total,
                  levelTestBestBand: result.band,
                  levelTestBestIelts: result.ieltsBand,
                  levelTestBestAt: serverTimestamp(),
                }
              : {}),
          },
          { merge: true }
        );
      } catch (err) {
        console.error("Səviyyə testi nəticəsi Firestore-a saxlanılmadı:", err);
      }
    },
    [currentUser]
  );

  const value = {
    currentUser,
    isLoadingAuth: currentUser === undefined,
    stats,
    isStatsLoading,
    levelResult,
    logout,
    recordResult,
    recordLevelTestResult,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};