import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL, useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";

const EMOTIONS = [
  { name: "Happy", emoji: "😊", description: "I feel happy!" },
  { name: "Sad", emoji: "😢", description: "I feel sad." },
  { name: "Angry", emoji: "😠", description: "I feel angry!" },
  { name: "Scared", emoji: "😨", description: "I feel scared." },
  { name: "Surprised", emoji: "😲", description: "I feel surprised!" },
  { name: "Tired", emoji: "😴", description: "I feel tired." },
  { name: "Excited", emoji: "🤩", description: "I feel excited!" },
  { name: "Silly", emoji: "🤪", description: "I feel silly!" },
];

export default function EmotionsScreen() {
  const insets = useSafeAreaInsets();
  const { selected, score, question, options, confettiRef, handleSelect } =
    useActivityGame(EMOTIONS, (e) => e.name, "Emotions", "You found all 10 emotions!");

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
        <Text style={activityStyles.questionText}>Which emotion is this?</Text>
        <Text style={styles.questionEmoji}>{question.emoji}</Text>
        <Text style={styles.description}>{question.description}</Text>
      </View>

      <View style={activityStyles.grid}>
        {options.map((emotion) => (
          <TouchableOpacity
            key={emotion.name}
            style={[
              activityStyles.optionCard,
              selectedCardStyle(selected === emotion.name, emotion.name === question.name),
            ]}
            onPress={() => handleSelect(emotion)}
          >
            <Text style={styles.optionEmoji}>{emotion.emoji}</Text>
            <Text style={styles.optionName}>{emotion.name}</Text>
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
  questionEmoji: { fontSize: 80, marginBottom: 12 },
  description: { fontSize: 16, color: "#666", fontStyle: "italic" },
  optionEmoji: { fontSize: 40, marginBottom: 8 },
  optionName: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
