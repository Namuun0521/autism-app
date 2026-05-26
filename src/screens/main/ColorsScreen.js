import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";
import { speak } from "../../utils/speech";
import { THEME } from "../../constants";

const COLORS = [
  { name: "Red",    hex: "#FF6B6B", dark: "#E53935", emoji: "🔴" },
  { name: "Blue",   hex: "#4FACFE", dark: "#1565C0", emoji: "🔵" },
  { name: "Yellow", hex: "#F6D365", dark: "#F57F17", emoji: "🟡" },
  { name: "Green",  hex: "#43E97B", dark: "#2E7D32", emoji: "🟢" },
  { name: "Purple", hex: "#A78BFA", dark: "#6A1B9A", emoji: "🟣" },
  { name: "Orange", hex: "#FDA085", dark: "#E65100", emoji: "🟠" },
];

export default function ColorsScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion, questionIndex } =
    useActivityGame(COLORS, (c) => c.name, "Colors", "Amazing! You found all the colors!", (q) => `Can you find the color ${q.name}?`);

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion} questionIndex={questionIndex}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>Find this color!</Text>
        <LinearGradient
          colors={[question.hex, question.dark]}
          style={styles.colorCircle}
        />
        <Text style={styles.colorName}>{question.name}</Text>
      </View>

      <View style={activityStyles.grid}>
        {options.map((color) => (
          <TouchableOpacity
            key={color.name}
            style={[
              activityStyles.optionCard,
              { backgroundColor: color.hex },
              selectedCardStyle(selected === color.name, color.name === question.name),
            ]}
            onPress={() => { speak(color.name); handleSelect(color); }}
            activeOpacity={0.82}
          >
            <Text style={styles.colorEmoji}>{color.emoji}</Text>
            <Text style={styles.colorLabel}>{color.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  colorCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  colorName: { fontSize: 26, fontWeight: "800", color: THEME.text },
  colorEmoji: { fontSize: 34, marginBottom: 8 },
  colorLabel: { fontSize: 15, fontWeight: "700", color: THEME.text },
});
