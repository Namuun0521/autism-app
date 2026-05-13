import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { GRADIENTS, THEME } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";
import { speak } from "../../utils/speech";

// Each need: a situation emoji (problem) + what the child needs (answer)
const NEEDS = [
  { name: "Food",    situationEmoji: "😋", needEmoji: "🍎", situation: "I'm hungry!" },
  { name: "Water",   situationEmoji: "😤", needEmoji: "💧", situation: "I'm thirsty!" },
  { name: "Sleep",   situationEmoji: "😴", needEmoji: "🛏️", situation: "I'm tired!" },
  { name: "Help",    situationEmoji: "😟", needEmoji: "🙋", situation: "I need help!" },
  { name: "Toilet",  situationEmoji: "🤸", needEmoji: "🚽", situation: "I need the bathroom!" },
  { name: "Hug",     situationEmoji: "😢", needEmoji: "🤗", situation: "I need a hug!" },
  { name: "Warm",    situationEmoji: "🥶", needEmoji: "🧥", situation: "I'm cold!" },
  { name: "Cool",    situationEmoji: "🥵", needEmoji: "❄️", situation: "I'm too hot!" },
];

export default function BasicNeedsScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(
      NEEDS,
      (n) => n.name,
      "BasicNeeds",
      "Amazing! You know all your basic needs!",
      (q) => `${q.situation} What do I need?`,
    );

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>What do I need?</Text>
        <LinearGradient colors={GRADIENTS.peach} style={styles.situationCircle}>
          <Text style={styles.situationEmoji}>{question.situationEmoji}</Text>
        </LinearGradient>
        <View style={styles.speechBubble}>
          <Text style={styles.situationText}>{question.situation}</Text>
        </View>
      </View>

      <View style={activityStyles.grid}>
        {options.map((need) => (
          <TouchableOpacity
            key={need.name}
            style={[
              activityStyles.optionCard,
              selectedCardStyle(selected === need.name, need.name === question.name),
            ]}
            onPress={() => { speak(need.name); handleSelect(need); }}
            activeOpacity={0.82}
          >
            <Text style={activityStyles.optionEmoji}>{need.needEmoji}</Text>
            <Text style={activityStyles.optionName}>{need.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  situationCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#FFECD2",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  situationEmoji: { fontSize: 58 },
  speechBubble: {
    backgroundColor: "#FFF5E6",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "#FFDDB3",
  },
  situationText: {
    fontSize: 16,
    fontWeight: "700",
    color: THEME.text,
    textAlign: "center",
  },
});
