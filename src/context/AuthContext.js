// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

export const AuthContext = createContext();

const DEFAULT_STATS = { testsTaken: 0, correctAnswers: 0, wrongAnswers: 0 };

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined); // undefined = yüklənir, null = giriş yoxdur
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
      if (!user) {
        setStats(DEFAULT_STATS);
      }
    });
    return unsubAuth;
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const unsubSnap = onSnapshot(
      userRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setStats({
            testsTaken: data.testsTaken || 0,
            correctAnswers: data.correctAnswers || 0,
            wrongAnswers: data.wrongAnswers || 0,
          });
        } else {
          setStats(DEFAULT_STATS);
        }
      },
      (err) => {
        console.error("Profil statistikası oxunmadı:", err);
      }
    );

    return unsubSnap;
  }, [currentUser]);

  const logout = () => signOut(auth);

  const value = {
    currentUser,
    isLoadingAuth: currentUser === undefined,
    stats,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
