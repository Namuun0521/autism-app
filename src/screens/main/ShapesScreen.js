import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { GRADIENTS, THEME } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";
import { speak } from "../../utils/speech";

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
  const {
    selected,
    score,
    question,
    options,
    confettiRef,
    handleSelect,
    speakQuestion,
  } = useActivityGame(
    SHAPES,
    (s) => s.name,
    "Shapes",
    "You found all 10 shapes!",
    (s) => `Find the ${s.name}!`,
  );

  return (
    <ActivityLayout
      score={score}
      confettiRef={confettiRef}
      onSpeak={speakQuestion}
    >
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>Find this shape!</Text>
        <LinearGradient colors={GRADIENTS.violet} style={styles.shapeCircle}>
          <Text style={styles.questionEmoji}>{question.emoji}</Text>
        </LinearGradient>
        <Text style={styles.shapeName}>{question.name}</Text>
      </View>

      <View style={activityStyles.grid}>
        {options.map((shape) => (
          <TouchableOpacity
            key={shape.name}
            style={[
              activityStyles.optionCard,
              selectedCardStyle(
                selected === shape.name,
                shape.name === question.name,
              ),
            ]}
            onPress={() => {
              speak(shape.name);
              handleSelect(shape);
            }}
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
    shadowColor: THEME.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  questionEmoji: { fontSize: 56 },
  shapeName: { fontSize: 26, fontWeight: "800", color: THEME.text, marginTop: 10 },
});
