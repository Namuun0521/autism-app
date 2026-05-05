import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL, useActivityGame } from "../../hooks/useActivityGame";
import { THEME } from "../../constants";
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
  const insets = useSafeAreaInsets();
  const { selected, score, question, options, confettiRef, handleSelect } =
    useActivityGame(LETTERS, (l) => l.letter, "Letters", "You found all 10 letters!");

  return (
    <View style={[activityStyles.container, { paddingTop: insets.top }]}>
      <View style={activityStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={activityStyles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={activityStyles.progress}>
          {score} / {GAME_TOTAL} ⭐
        </Text>
      </View>

      <View style={activityStyles.progressBar}>
        <View style={[activityStyles.progressFill, { width: `${(score / GAME_TOTAL) * 100}%` }]} />
      </View>

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
  emoji: { fontSize: 64, marginBottom: 8 },
  word: { fontSize: 28, fontWeight: "bold", color: "#333", marginBottom: 8 },
  letterCard: { padding: 24 },
  letter: { fontSize: 48, fontWeight: "bold", color: THEME.brand },
});
