import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL, useActivityGame } from "../../hooks/useActivityGame";

const NUMBERS = [
  { number: 1, emoji: "1️⃣", items: "🌟" },
  { number: 2, emoji: "2️⃣", items: "🍎🍎" },
  { number: 3, emoji: "3️⃣", items: "🐶🐶🐶" },
  { number: 4, emoji: "4️⃣", items: "🌈🌈🌈🌈" },
  { number: 5, emoji: "5️⃣", items: "⭐⭐⭐⭐⭐" },
  { number: 6, emoji: "6️⃣", items: "🍭🍭🍭🍭🍭🍭" },
  { number: 7, emoji: "7️⃣", items: "🦋🦋🦋🦋🦋🦋🦋" },
  { number: 8, emoji: "8️⃣", items: "🍓🍓🍓🍓🍓🍓🍓🍓" },
  { number: 9, emoji: "9️⃣", items: "🐱🐱🐱🐱🐱🐱🐱🐱🐱" },
  { number: 10, emoji: "🔟", items: "🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈" },
];

export default function NumbersScreen() {
  const insets = useSafeAreaInsets();
  const { selected, score, question, options, confettiRef, handleSelect } =
    useActivityGame(NUMBERS, (n) => n.number, "Numbers", "You counted all 10 numbers!");

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
        <Text style={styles.questionText}>Count the items!</Text>
        <Text style={styles.items}>{question.items}</Text>
        <Text style={styles.questionSub}>How many are there?</Text>
      </View>

      <View style={styles.grid}>
        {options.map((item) => (
          <TouchableOpacity
            key={item.number}
            style={[
              styles.numberCard,
              selected === item.number && {
                borderWidth: 4,
                borderColor: item.number === question.number ? "#00C853" : "#FF1744",
                backgroundColor: item.number === question.number ? "#E8FFE8" : "#FFE8E8",
              },
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.numberEmoji}>{item.emoji}</Text>
            <Text style={styles.number}>{item.number}</Text>
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
  questionText: { fontSize: 18, color: "#999", marginBottom: 16 },
  items: { fontSize: 36, marginBottom: 12, letterSpacing: 4 },
  questionSub: { fontSize: 16, color: "#666" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  numberCard: {
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
  numberEmoji: { fontSize: 32, marginBottom: 8 },
  number: { fontSize: 36, fontWeight: "bold", color: "#6B4EFF" },
});
