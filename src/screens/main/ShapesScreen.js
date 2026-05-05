import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL, useActivityGame } from "../../hooks/useActivityGame";
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
  const insets = useSafeAreaInsets();
  const { selected, score, question, options, confettiRef, handleSelect } =
    useActivityGame(SHAPES, (s) => s.name, "Shapes", "You found all 10 shapes!");

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
  questionEmoji: { fontSize: 80 },
  optionEmoji: { fontSize: 40, marginBottom: 8 },
  optionName: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
