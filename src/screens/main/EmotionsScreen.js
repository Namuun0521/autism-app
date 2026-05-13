import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { GRADIENTS, THEME } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";
import { speak } from "../../utils/speech";

const EMOTIONS = [
  { name: "Happy",     emoji: "😊", description: "I feel happy!" },
  { name: "Sad",       emoji: "😢", description: "I feel sad." },
  { name: "Angry",     emoji: "😠", description: "I feel angry!" },
  { name: "Scared",    emoji: "😨", description: "I feel scared." },
  { name: "Surprised", emoji: "😲", description: "I feel surprised!" },
  { name: "Tired",     emoji: "😴", description: "I feel tired." },
  { name: "Excited",   emoji: "🤩", description: "I feel excited!" },
  { name: "Silly",     emoji: "🤪", description: "I feel silly!" },
];

export default function EmotionsScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(EMOTIONS, (e) => e.name, "Emotions", "You found all 10 emotions!", (q) => q.description);

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>Which emotion is this?</Text>
        <LinearGradient colors={GRADIENTS.gold} style={styles.emojiCircle}>
          <Text style={styles.questionEmoji}>{question.emoji}</Text>
        </LinearGradient>
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
            onPress={() => { speak(emotion.name); handleSelect(emotion); }}
            activeOpacity={0.82}
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
  emojiCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#F6D365",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  questionEmoji: { fontSize: 60 },
  description: {
    fontSize: 16,
    color: THEME.textSub,
    fontStyle: "italic",
    fontWeight: "500",
  },
});
