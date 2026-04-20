import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./config";

// Хүүхдийн дэвшил хадгалах
export const saveProgress = async (activity, score) => {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "progress", activity);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    await updateDoc(ref, {
      totalScore: increment(score),
      timesPlayed: increment(1),
      lastPlayed: new Date(),
    });
  } else {
    await setDoc(ref, {
      activity,
      totalScore: score,
      timesPlayed: 1,
      lastPlayed: new Date(),
    });
  }
};

// Нийт од авах
export const getTotalStars = async () => {
  const user = auth.currentUser;
  if (!user) return 0;

  const activities = ["Colors", "Letters", "Numbers", "Emotions"];
  let total = 0;

  for (const activity of activities) {
    const ref = doc(db, "users", user.uid, "progress", activity);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      total += snap.data().totalScore || 0;
    }
  }
  return total;
};
