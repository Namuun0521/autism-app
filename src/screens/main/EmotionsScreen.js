import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { saveProgress } from "../../firebase/firestore";

const EMOTIONS = [
  { name: "Happy", emoji: "😊", description: "I feel happy!" },
  { name: "Sad", emoji: "😢", description: "I feel sad." },
  { name: "Angry", emoji: "😠", description: "I feel angry!" },
  { name: "Scared", emoji: "😨", description: "I feel scared." },
  { name: "Surprised", emoji: "😲", description: "I feel surprised!" },
  { name: "Tired", emoji: "😴", description: "I feel tired." },
  { name: "Excited", emoji: "🤩", description: "I feel excited!" },
  { name: "Silly", emoji: "🤪", description: "I feel silly!" },
];

const TOTAL = 10;

export default function EmotionsScreen() {
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const confettiRef = useRef(null);
  const [question, setQuestion] = useState(
    EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)],
  );

  const getOptions = (correct) => {
    const wrong = EMOTIONS.filter((e) => e.name !== correct.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...wrong, correct].sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState(() => getOptions(question));

  const handleSelect = async (emotion) => {
    if (selected) return;
    setSelected(emotion.name);

    if (emotion.name === question.name) {
      const newScore = score + 1;
      setScore(newScore);

      if (newScore === TOTAL) {
        confettiRef.current?.start();
        await saveProgress("Emotions", newScore);
        setTimeout(() => {
          Alert.alert("🎉 Amazing!", "You found all 10 emotions!", [
            { text: "Go Home", onPress: () => router.back() },
          ]);
        }, 2000);
      } else {
        setTimeout(() => {
          const newQuestion =
            EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
          setSelected(null);
          setQuestion(newQuestion);
          setOptions(getOptions(newQuestion));
        }, 800);
      }
    } else {
      setTimeout(() => setSelected(null), 800);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.progress}>
          {score} / {TOTAL} ⭐
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${(score / TOTAL) * 100}%` }]}
        />
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>Which emotion is this?</Text>
        <Text style={styles.questionEmoji}>{question.emoji}</Text>
        <Text style={styles.description}>{question.description}</Text>
      </View>

      <View style={styles.grid}>
        {options.map((emotion) => (
          <TouchableOpacity
            key={emotion.name}
            style={[
              styles.emotionCard,
              selected === emotion.name && {
                borderWidth: 4,
                borderColor:
                  emotion.name === question.name ? "#00C853" : "#FF1744",
                backgroundColor:
                  emotion.name === question.name ? "#E8FFE8" : "#FFE8E8",
              },
            ]}
            onPress={() => handleSelect(emotion)}
          >
            <Text style={styles.emoji}>{emotion.emoji}</Text>
            <Text style={styles.emotionName}>{emotion.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ConfettiCannon
        ref={confettiRef}
        count={100}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        fadeOut={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F6FF", padding: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 16,
  },
  back: { fontSize: 16, color: "#6B4EFF", fontWeight: "bold" },
  progress: { fontSize: 18, fontWeight: "bold", color: "#333" },
  progressBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 24,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#6B4EFF",
    borderRadius: 4,
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  questionText: { fontSize: 18, color: "#999", marginBottom: 16 },
  questionEmoji: { fontSize: 80, marginBottom: 12 },
  description: { fontSize: 16, color: "#666", fontStyle: "italic" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  emotionCard: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  emoji: { fontSize: 40, marginBottom: 8 },
  emotionName: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
