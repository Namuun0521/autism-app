import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL, useActivityGame } from "../../hooks/useActivityGame";

const LETTERS = [
  { letter: "A", word: "Apple", emoji: "🍎" },
  { letter: "B", word: "Ball", emoji: "⚽" },
  { letter: "C", word: "Cat", emoji: "🐱" },
  { letter: "D", word: "Dog", emoji: "🐶" },
  { letter: "E", word: "Elephant", emoji: "🐘" },
  { letter: "F", word: "Fish", emoji: "🐟" },
  { letter: "G", word: "Grape", emoji: "🍇" },
  { letter: "H", word: "House", emoji: "🏠" },
  { letter: "I", word: "Ice cream", emoji: "🍦" },
  { letter: "J", word: "Juice", emoji: "🧃" },
  { letter: "K", word: "Kite", emoji: "🪁" },
  { letter: "L", word: "Lion", emoji: "🦁" },
  { letter: "M", word: "Moon", emoji: "🌙" },
  { letter: "N", word: "Nut", emoji: "🥜" },
  { letter: "O", word: "Orange", emoji: "🍊" },
  { letter: "P", word: "Pizza", emoji: "🍕" },
  { letter: "Q", word: "Queen", emoji: "👑" },
  { letter: "R", word: "Rainbow", emoji: "🌈" },
  { letter: "S", word: "Star", emoji: "⭐" },
  { letter: "T", word: "Tiger", emoji: "🐯" },
  { letter: "U", word: "Umbrella", emoji: "☂️" },
  { letter: "V", word: "Violin", emoji: "🎻" },
  { letter: "W", word: "Whale", emoji: "🐳" },
  { letter: "X", word: "Xylophone", emoji: "🎵" },
  { letter: "Y", word: "Yarn", emoji: "🧶" },
  { letter: "Z", word: "Zebra", emoji: "🦓" },
];

export default function LettersScreen() {
  const insets = useSafeAreaInsets();
  const { selected, score, question, options, confettiRef, handleSelect } =
    useActivityGame(LETTERS, (l) => l.letter, "Letters", "You found all 10 letters!");

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.progress}>
          {score} / {GAME_TOTAL} ⭐
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(score / GAME_TOTAL) * 100}%` }]} />
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.emoji}>{question.emoji}</Text>
        <Text style={styles.word}>{question.word}</Text>
        <Text style={styles.questionText}>Which letter does it start with?</Text>
      </View>

      <View style={styles.grid}>
        {options.map((item) => (
          <TouchableOpacity
            key={item.letter}
            style={[
              styles.letterCard,
              selected === item.letter && {
                borderWidth: 4,
                borderColor: item.letter === question.letter ? "#00C853" : "#FF1744",
                backgroundColor: item.letter === question.letter ? "#E8FFE8" : "#FFE8E8",
              },
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.letter}>{item.letter}</Text>
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
  progressFill: { height: 8, backgroundColor: "#6B4EFF", borderRadius: 4 },
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
  emoji: { fontSize: 64, marginBottom: 8 },
  word: { fontSize: 28, fontWeight: "bold", color: "#333", marginBottom: 8 },
  questionText: { fontSize: 16, color: "#999" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  letterCard: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  letter: { fontSize: 48, fontWeight: "bold", color: "#6B4EFF" },
});
