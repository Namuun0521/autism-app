import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { GRADIENTS, THEME } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";
import { speak } from "../../utils/speech";

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
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(LETTERS, (l) => l.letter, "Letters", "You found all 10 letters!", (q) => `${q.word}! Which letter does ${q.word} start with?`);

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={styles.emoji}>{question.emoji}</Text>
        <Text style={styles.word}>{question.word}</Text>
        <Text style={activityStyles.questionText}>Which letter does it start with?</Text>
      </View>

      <View style={activityStyles.grid}>
        {options.map((item) => (
          <TouchableOpacity
            key={item.letter}
            style={[
              activityStyles.optionCard,
              selectedCardStyle(selected === item.letter, item.letter === question.letter),
            ]}
            onPress={() => { speak(item.letter); handleSelect(item); }}
            activeOpacity={0.82}
          >
            <LinearGradient colors={GRADIENTS.sky} style={styles.letterBadge}>
              <Text style={styles.letter}>{item.letter}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  emoji: { fontSize: 72, marginBottom: 10 },
  word: { fontSize: 30, fontWeight: "800", color: THEME.text, marginBottom: 8 },
  letterBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4FACFE",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  letter: { fontSize: 40, fontWeight: "900", color: "#fff" },
});
