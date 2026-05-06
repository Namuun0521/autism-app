import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert } from "react-native";
import { GAME_TOTAL } from "../constants";
import { saveProgress } from "../firebase/firestore";
import { playCorrect, playWrong } from "../utils/sounds";

export { GAME_TOTAL };

function buildQueue(items, total) {
  const queue = [];
  while (queue.length < total) {
    queue.push(...[...items].sort(() => Math.random() - 0.5));
  }
  return queue.slice(0, total);
}

function makeOptions(items, getKey, correct) {
  const wrong = items
    .filter((item) => getKey(item) !== getKey(correct))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return [...wrong, correct].sort(() => Math.random() - 0.5);
}

export function useActivityGame(items, getKey, activityName, completionMessage) {
  const [queue] = useState(() => buildQueue(items, GAME_TOTAL));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState(() => makeOptions(items, getKey, queue[0]));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const confettiRef = useRef(null);

  const question = queue[questionIndex];

  const handleSelect = async (item) => {
    if (selected !== null) return;
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
        const nextIndex = questionIndex + 1;
        setTimeout(() => {
          setQuestionIndex(nextIndex);
          setOptions(makeOptions(items, getKey, queue[nextIndex]));
          setSelected(null);
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
