import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL, useActivityGame } from "../../hooks/useActivityGame";
import { THEME } from "../../constants";
import { activityStyles, selectedCardStyle } from "../../styles/activity";

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
        <Text style={activityStyles.questionText}>Count the items!</Text>
        <Text style={styles.items}>{question.items}</Text>
        <Text style={styles.questionSub}>How many are there?</Text>
      </View>

      <View style={activityStyles.grid}>
        {options.map((item) => (
          <TouchableOpacity
            key={item.number}
            style={[
              activityStyles.optionCard,
              selectedCardStyle(selected === item.number, item.number === question.number),
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
  items: { fontSize: 36, marginBottom: 12, letterSpacing: 4 },
  questionSub: { fontSize: 16, color: "#666" },
  numberEmoji: { fontSize: 32, marginBottom: 8 },
  number: { fontSize: 36, fontWeight: "bold", color: THEME.brand },
});
