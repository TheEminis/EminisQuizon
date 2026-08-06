// src/hooks/usePersistedState.js
//
// A drop-in replacement for React.useState that also saves the value to
// localStorage. This is what keeps quiz progress and results (including
// wrong-answer explanations) on the screen after the user refreshes the
// page or logs in/out - previously all of that lived only in React state
// and disappeared the moment the component unmounted or the page reloaded.
import { useState, useEffect, useRef } from 'react';

const isBrowser = typeof window !== 'undefined' && !!window.localStorage;

const readValue = (key, defaultValue) => {
  if (!isBrowser) return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : defaultValue;
  } catch (err) {
    // Corrupted or inaccessible storage shouldn't break the app.
    console.warn(`usePersistedState: could not read "${key}"`, err);
    return defaultValue;
  }
};

export const usePersistedState = (key, defaultValue) => {
  const [state, setState] = useState(() => readValue(key, defaultValue));
  const keyRef = useRef(key);

  // If the key itself changes (e.g. switching between quiz topics), load
  // the value stored for the new key instead of carrying over old data.
  useEffect(() => {
    if (keyRef.current !== key) {
      keyRef.current = key;
      setState(readValue(key, defaultValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.warn(`usePersistedState: could not save "${key}"`, err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, state]);

  return [state, setState];
};

// Removes a persisted value (used when the user explicitly resets/exits
// a quiz so old progress doesn't linger forever in localStorage).
export const clearPersistedState = (key) => {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    // ignore
  }
};

export default usePersistedState;
