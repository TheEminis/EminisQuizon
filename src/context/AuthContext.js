// src/context/AuthContext.js
import React, { createContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, onSnapshot, increment, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { readLocalStats, writeLocalStats, addLocalTestResult, DEFAULT_STATS } from "../utils/localStats";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined); // undefined = yüklənir, null = giriş yoxdur
  const [stats, setStats] = useState(DEFAULT_STATS);
  // Statistika Firestore-dan hələ gəlməyib - bunu bilmək lazımdır ki,
  // "0" rəqəmini həqiqi məlumat kimi yox, yüklənmə anı kimi göstərək.
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
      if (!user) {
        // Qonaq (giriş etməmiş) istifadəçi - bu brauzerdə əvvəl
        // saxlanmış qonaq statistikasını göstər, sıfır yox.
        setStats(readLocalStats(null));
        setIsStatsLoading(false);
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

  const value = {
    currentUser,
    isLoadingAuth: currentUser === undefined,
    stats,
    isStatsLoading,
    logout,
    recordResult,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};