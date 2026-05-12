import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { GRADIENTS, THEME } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";

const BODY_PARTS = [
  { name: "Eye",   emoji: "👁️" },
  { name: "Nose",  emoji: "👃" },
  { name: "Mouth", emoji: "👄" },
  { name: "Ear",   emoji: "👂" },
  { name: "Hand",  emoji: "🤚" },
  { name: "Foot",  emoji: "🦶" },
  { name: "Arm",   emoji: "💪" },
  { name: "Leg",   emoji: "🦵" },
];

export default function BodyPartsScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(
      BODY_PARTS,
      (b) => b.name,
      "BodyParts",
      "You know all your body parts!",
      (q) => `Where is your ${q.name}?`,
    );

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>Which body part is this?</Text>
        <LinearGradient colors={GRADIENTS.teal} style={styles.partCircle}>
          <Text style={styles.questionEmoji}>{question.emoji}</Text>
        </LinearGradient>
        <Text style={styles.questionName}>{question.name}</Text>
      </View>

      <View style={activityStyles.grid}>
        {options.map((part) => (
          <TouchableOpacity
            key={part.name}
            style={[
              activityStyles.optionCard,
              selectedCardStyle(selected === part.name, part.name === question.name),
            ]}
            onPress={() => handleSelect(part)}
            activeOpacity={0.82}
          >
            <Text style={activityStyles.optionEmoji}>{part.emoji}</Text>
            <Text style={activityStyles.optionName}>{part.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  partCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#0ED2F7",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  questionEmoji: { fontSize: 64 },
  questionName: { fontSize: 26, fontWeight: "800", color: THEME.text },
});
