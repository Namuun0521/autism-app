import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { GRADIENTS, THEME } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";
import { speak } from "../../utils/speech";

const NUMBERS = [
  { number: 1,  emoji: "1️⃣", items: "🌟" },
  { number: 2,  emoji: "2️⃣", items: "🍎🍎" },
  { number: 3,  emoji: "3️⃣", items: "🐶🐶🐶" },
  { number: 4,  emoji: "4️⃣", items: "🌈🌈🌈🌈" },
  { number: 5,  emoji: "5️⃣", items: "⭐⭐⭐⭐⭐" },
  { number: 6,  emoji: "6️⃣", items: "🍭🍭🍭🍭🍭🍭" },
  { number: 7,  emoji: "7️⃣", items: "🦋🦋🦋🦋🦋🦋🦋" },
  { number: 8,  emoji: "8️⃣", items: "🍓🍓🍓🍓🍓🍓🍓🍓" },
  { number: 9,  emoji: "9️⃣", items: "🐱🐱🐱🐱🐱🐱🐱🐱🐱" },
  { number: 10, emoji: "🔟", items: "🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈" },
];

export default function NumbersScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion, questionIndex } =
    useActivityGame(NUMBERS, (n) => n.number, "Numbers", "You counted all 10 numbers!", () => "Count the items! How many are there?");

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion} questionIndex={questionIndex}>
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
            onPress={() => { speak(String(item.number)); handleSelect(item); }}
            activeOpacity={0.82}
          >
            <LinearGradient colors={GRADIENTS.mint} style={styles.numberBadge}>
              <Text style={styles.number}>{item.number}</Text>
            </LinearGradient>
            <Text style={styles.numberEmoji}>{item.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  items: {
    fontSize: 34,
    marginBottom: 12,
    letterSpacing: 3,
    textAlign: "center",
    lineHeight: 48,
  },
  questionSub: { fontSize: 15, color: THEME.textSub, fontWeight: "500" },
  numberBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#43E97B",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  number: { fontSize: 34, fontWeight: "900", color: "#fff" },
  numberEmoji: { fontSize: 22 },
});
