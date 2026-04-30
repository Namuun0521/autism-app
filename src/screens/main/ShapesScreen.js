import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ConfettiCannon from "react-native-confetti-cannon";
import { saveProgress } from "../../firebase/firestore";
import { playCorrect, playWrong } from "../../utils/sounds";

const SHAPES = [
  { name: "Circle", emoji: "🔵" },
  { name: "Square", emoji: "🟥" },
  { name: "Triangle", emoji: "🔺" },
  { name: "Star", emoji: "⭐" },
  { name: "Heart", emoji: "❤️" },
  { name: "Diamond", emoji: "💎" },
  { name: "Rectangle", emoji: "🟦" },
  { name: "Oval", emoji: "🥚" },
];

const TOTAL = 10;

export default function ShapesScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const confettiRef = useRef(null);
  const [question, setQuestion] = useState(
    SHAPES[Math.floor(Math.random() * SHAPES.length)],
  );

  const getOptions = (correct) => {
    const wrong = SHAPES.filter((s) => s.name !== correct.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...wrong, correct].sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState(() => getOptions(question));

  const handleSelect = async (shape) => {
    if (selected) return;
    setSelected(shape.name);

    if (shape.name === question.name) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      playCorrect();
      const newScore = score + 1;
      setScore(newScore);

      if (newScore === TOTAL) {
        confettiRef.current?.start();
        await saveProgress("Shapes", newScore);
        setTimeout(() => {
          Alert.alert("🎉 Amazing!", "You found all 10 shapes!", [
            { text: "Go Home", onPress: () => router.back() },
          ]);
        }, 2000);
      } else {
        setTimeout(() => {
          const others = SHAPES.filter((s) => s.name !== question.name);
          const newQuestion = others[Math.floor(Math.random() * others.length)];
          setSelected(null);
          setQuestion(newQuestion);
          setOptions(getOptions(newQuestion));
        }, 800);
      }
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      playWrong();
      setTimeout(() => setSelected(null), 800);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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
        <Text style={styles.questionText}>What shape is this?</Text>
        <Text style={styles.questionEmoji}>{question.emoji}</Text>
      </View>

      <View style={styles.grid}>
        {options.map((shape) => (
          <TouchableOpacity
            key={shape.name}
            style={[
              styles.shapeCard,
              selected === shape.name && {
                borderWidth: 4,
                borderColor:
                  shape.name === question.name ? "#00C853" : "#FF1744",
                backgroundColor:
                  shape.name === question.name ? "#E8FFE8" : "#FFE8E8",
              },
            ]}
            onPress={() => handleSelect(shape)}
          >
            <Text style={styles.shapeEmoji}>{shape.emoji}</Text>
            <Text style={styles.shapeName}>{shape.name}</Text>
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
    marginTop: 8,
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
  questionEmoji: { fontSize: 80 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  shapeCard: {
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
  shapeEmoji: { fontSize: 40, marginBottom: 8 },
  shapeName: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
