import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { useActivityGame } from "../../hooks/useActivityGame";
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
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(EMOTIONS, (e) => e.name, "Emotions", "You found all 10 emotions!", (q) => q.description);

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
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
            <Text style={activityStyles.optionEmoji}>{emotion.emoji}</Text>
            <Text style={activityStyles.optionName}>{emotion.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  questionEmoji: { fontSize: 80, marginBottom: 12 },
  description: { fontSize: 16, color: "#666", fontStyle: "italic" },
});
