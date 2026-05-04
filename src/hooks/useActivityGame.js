import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert } from "react-native";
import { GAME_TOTAL } from "../constants";
import { saveProgress } from "../firebase/firestore";
import { playCorrect, playWrong } from "../utils/sounds";

export { GAME_TOTAL };

export function useActivityGame(items, getKey, activityName, completionMessage) {
  const getOptions = (correct) => {
    const wrong = items
      .filter((item) => getKey(item) !== getKey(correct))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...wrong, correct].sort(() => Math.random() - 0.5);
  };

  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const confettiRef = useRef(null);
  const [question, setQuestion] = useState(
    () => items[Math.floor(Math.random() * items.length)]
  );
  const [options, setOptions] = useState(() => getOptions(question));

  const handleSelect = async (item) => {
    if (selected) return;
    const key = getKey(item);
    setSelected(key);

    if (key === getKey(question)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      playCorrect();
      const newScore = score + 1;
      setScore(newScore);

      if (newScore === GAME_TOTAL) {
        confettiRef.current?.start();
        await saveProgress(activityName, newScore);
        setTimeout(() => {
          Alert.alert("🎉 Amazing!", completionMessage, [
            { text: "Go Home", onPress: () => router.back() },
          ]);
        }, 2000);
      } else {
        setTimeout(() => {
          const others = items.filter((i) => getKey(i) !== getKey(question));
          const newQ = others[Math.floor(Math.random() * others.length)];
          setSelected(null);
          setQuestion(newQ);
          setOptions(getOptions(newQ));
        }, 800);
      }
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      playWrong();
      setTimeout(() => setSelected(null), 800);
    }
  };

  return { selected, score, question, options, confettiRef, handleSelect };
}
