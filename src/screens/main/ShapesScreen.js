import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { GRADIENTS } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";

const SHAPES = [
  { name: "Circle",    emoji: "🔵" },
  { name: "Square",    emoji: "🟥" },
  { name: "Triangle",  emoji: "🔺" },
  { name: "Star",      emoji: "⭐" },
  { name: "Heart",     emoji: "❤️" },
  { name: "Diamond",   emoji: "💎" },
  { name: "Rectangle", emoji: "🟦" },
  { name: "Oval",      emoji: "🥚" },
];

export default function ShapesScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(SHAPES, (s) => s.name, "Shapes", "You found all 10 shapes!", () => "What shape is this?");

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>What shape is this?</Text>
        <LinearGradient colors={GRADIENTS.violet} style={styles.shapeCircle}>
          <Text style={styles.questionEmoji}>{question.emoji}</Text>
        </LinearGradient>
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
            activeOpacity={0.82}
          >
            <Text style={activityStyles.optionEmoji}>{shape.emoji}</Text>
            <Text style={activityStyles.optionName}>{shape.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  shapeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#A18CD1",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  questionEmoji: { fontSize: 64 },
});
