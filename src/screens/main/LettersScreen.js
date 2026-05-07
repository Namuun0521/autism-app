import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { THEME } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";

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
              styles.letterCard,
              selectedCardStyle(selected === item.letter, item.letter === question.letter),
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.letter}>{item.letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  emoji: { fontSize: 64, marginBottom: 8 },
  word: { fontSize: 28, fontWeight: "bold", color: "#333", marginBottom: 8 },
  letterCard: { padding: 24 },
  letter: { fontSize: 48, fontWeight: "bold", color: THEME.brand },
});
