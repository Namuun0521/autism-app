import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";

const COLORS = [
  { name: "Red", hex: "#FF6B6B", emoji: "🔴" },
  { name: "Blue", hex: "#87CEEB", emoji: "🔵" },
  { name: "Yellow", hex: "#FFE66D", emoji: "🟡" },
  { name: "Green", hex: "#95E77E", emoji: "🟢" },
  { name: "Purple", hex: "#B8A9FF", emoji: "🟣" },
  { name: "Orange", hex: "#FFA07A", emoji: "🟠" },
];

export default function ColorsScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(COLORS, (c) => c.name, "Colors", "You found all 10 colors!", (q) => `Can you find the color ${q.name}?`);

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>Find this color!</Text>
        <View style={[styles.colorCircle, { backgroundColor: question.hex }]} />
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
            onPress={() => handleSelect(color)}
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
  colorCircle: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  colorName: { fontSize: 24, fontWeight: "bold", color: "#333" },
  colorEmoji: { fontSize: 32, marginBottom: 8 },
  colorLabel: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
