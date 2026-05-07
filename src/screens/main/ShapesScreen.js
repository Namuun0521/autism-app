import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";

const SHAPES = [
  { name: "Circle", emoji: "🔵" },
  { name: "Square", emoji: "🟥" },
  { name: "Triangle", emoji: "🔺" },
  { name: "Star", emoji: "⭐" },
  { name: "Heart", emoji: "❤️" },
  { name: "Diamond", emoji: "💎" },
  { name: "Rectangle", emoji: "🟦" },
  { name: "Oval", emoji: "🥚" },
];

export default function ShapesScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(SHAPES, (s) => s.name, "Shapes", "You found all 10 shapes!", () => "What shape is this?");

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>What shape is this?</Text>
        <Text style={styles.questionEmoji}>{question.emoji}</Text>
      </View>

      <View style={activityStyles.grid}>
        {options.map((shape) => (
          <TouchableOpacity
            key={shape.name}
            style={[
              activityStyles.optionCard,
              selectedCardStyle(selected === shape.name, shape.name === question.name),
            ]}
            onPress={() => handleSelect(shape)}
          >
            <Text style={styles.optionEmoji}>{shape.emoji}</Text>
            <Text style={styles.optionName}>{shape.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  questionEmoji: { fontSize: 80 },
  optionEmoji: { fontSize: 40, marginBottom: 8 },
  optionName: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
