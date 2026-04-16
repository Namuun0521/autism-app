import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LETTERS = [
  { letter: "A", word: "Apple", emoji: "🍎" },
  { letter: "B", word: "Ball", emoji: "⚽" },
  { letter: "C", word: "Cat", emoji: "🐱" },
  { letter: "D", word: "Dog", emoji: "🐶" },
  { letter: "E", word: "Elephant", emoji: "🐘" },
  { letter: "F", word: "Fish", emoji: "🐟" },
  { letter: "G", word: "Grape", emoji: "🍇" },
  { letter: "H", word: "House", emoji: "🏠" },
];

const TOTAL = 10;

export default function LettersScreen() {
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(
    LETTERS[Math.floor(Math.random() * LETTERS.length)],
  );

  const getOptions = (correct) => {
    const wrong = LETTERS.filter((l) => l.letter !== correct.letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...wrong, correct].sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState(() => getOptions(question));

  const handleSelect = (letter) => {
    if (selected) return;
    setSelected(letter.letter);

    if (letter.letter === question.letter) {
      const newScore = score + 1;
      setScore(newScore);

      if (newScore === TOTAL) {
        setTimeout(() => {
          Alert.alert("🎉 Amazing!", "You found all 10 letters!", [
            { text: "Go Home", onPress: () => router.back() },
          ]);
        }, 500);
      } else {
        setTimeout(() => {
          const newQuestion =
            LETTERS[Math.floor(Math.random() * LETTERS.length)];
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
        <Text style={styles.emoji}>{question.emoji}</Text>
        <Text style={styles.word}>{question.word}</Text>
        <Text style={styles.questionText}>
          Which letter does it start with?
        </Text>
      </View>

      <View style={styles.grid}>
        {options.map((item) => (
          <TouchableOpacity
            key={item.letter}
            style={[
              styles.letterCard,
              selected === item.letter && {
                borderWidth: 4,
                borderColor:
                  item.letter === question.letter ? "#00C853" : "#FF1744",
                backgroundColor:
                  item.letter === question.letter ? "#E8FFE8" : "#FFE8E8",
              },
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.letter}>{item.letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
