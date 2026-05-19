import { doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { ACTIVITIES as ACTIVITY_LIST } from "../constants";
import { auth, db } from "./config";

const ACTIVITY_KEYS = ACTIVITY_LIST.map((a) => a.key);

export const saveProgress = async (activity: string, score: number) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const ref = doc(db, "users", user.uid, "progress", activity);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      await updateDoc(ref, {
        totalScore: increment(score),
        timesPlayed: increment(1),
        lastPlayed: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        activity,
        totalScore: score,
        timesPlayed: 1,
        lastPlayed: serverTimestamp(),
      });
    }
  } catch (e) {
    console.error("saveProgress failed:", e);
  }
};

export const getTotalStars = async () => {
  const user = auth.currentUser;
  if (!user) return 0;

  try {
    const snaps = await Promise.all(
      ACTIVITY_KEYS.map((a) => getDoc(doc(db, "users", user.uid, "progress", a)))
    );
    return snaps.reduce((total, snap) => total + (snap.exists() ? snap.data().totalScore || 0 : 0), 0);
  } catch (e) {
    console.error("getTotalStars failed:", e);
    return 0;
  }
};

export const getActivityProgress = async () => {
  const user = auth.currentUser;
  if (!user) return {};

  try {
    const snaps = await Promise.all(
      ACTIVITY_KEYS.map((a) => getDoc(doc(db, "users", user.uid, "progress", a)))
    );
    return Object.fromEntries(
      ACTIVITY_KEYS.map((a, i) => [a, snaps[i].exists() ? snaps[i].data().totalScore || 0 : 0])
    );
  } catch (e) {
    console.error("getActivityProgress failed:", e);
    return {};
  }
};
