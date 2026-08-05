// src/utils/testStats.js
import { doc, setDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Records the result of a completed test/quiz for the given user in Firestore.
 * Increments testsTaken, correctAnswers and wrongAnswers on the user's profile doc.
 *
 * @param {string} uid - Firebase Auth user id. If falsy, does nothing (guest).
 * @param {number} correctCount - number of correctly answered questions
 * @param {number} totalCount - total number of questions in the test
 */
export const recordTestResult = async (uid, correctCount, totalCount) => {
  if (!uid) return; // Not logged in - nothing to save

  const wrongCount = Math.max(totalCount - correctCount, 0);

  try {
    const userRef = doc(db, "users", uid);
    await setDoc(
      userRef,
      {
        testsTaken: increment(1),
        correctAnswers: increment(correctCount),
        wrongAnswers: increment(wrongCount),
        lastTestAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    // Don't break the UI if stats saving fails - just log it
    console.error("Test statistikası saxlanılmadı:", err);
  }
};
