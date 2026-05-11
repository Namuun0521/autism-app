import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
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
        <Text style={styles.questionEmoji}>{question.emoji}</Text>
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
  questionEmoji: { fontSize: 80, marginBottom: 8 },
  questionName:  { fontSize: 24, fontWeight: "bold", color: "#333" },
});
