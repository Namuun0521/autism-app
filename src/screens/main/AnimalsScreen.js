import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";

const ANIMALS = [
  { name: "Dog", emoji: "🐶" },
  { name: "Cat", emoji: "🐱" },
  { name: "Elephant", emoji: "🐘" },
  { name: "Lion", emoji: "🦁" },
  { name: "Rabbit", emoji: "🐰" },
  { name: "Penguin", emoji: "🐧" },
  { name: "Bear", emoji: "🐻" },
  { name: "Monkey", emoji: "🐵" },
];

export default function AnimalsScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(ANIMALS, (a) => a.name, "Animals", "You found all 10 animals!", () => "Which animal is this?");

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>Which animal is this?</Text>
        <Text style={styles.questionEmoji}>{question.emoji}</Text>
      </View>

      <View style={activityStyles.grid}>
        {options.map((animal) => (
          <TouchableOpacity
            key={animal.name}
            style={[
              activityStyles.optionCard,
              selectedCardStyle(selected === animal.name, animal.name === question.name),
            ]}
            onPress={() => handleSelect(animal)}
          >
            <Text style={styles.optionEmoji}>{animal.emoji}</Text>
            <Text style={styles.optionName}>{animal.name}</Text>
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
