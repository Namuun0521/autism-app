import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { GRADIENTS, THEME } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";
import { speak } from "../../utils/speech";

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
    useActivityGame(ANIMALS, (a) => a.name, "Animals", "You found all 10 animals!", (a) => `Find the ${a.name}!`);

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>Find this animal!</Text>
        <LinearGradient colors={GRADIENTS.coral} style={styles.animalCircle}>
          <Text style={styles.questionEmoji}>{question.emoji}</Text>
        </LinearGradient>
        <Text style={styles.animalName}>{question.name}</Text>
      </View>

      <View style={activityStyles.grid}>
        {options.map((animal) => (
          <TouchableOpacity
            key={animal.name}
            style={[
              activityStyles.optionCard,
              selectedCardStyle(selected === animal.name, animal.name === question.name),
            ]}
            onPress={() => { speak(animal.name); handleSelect(animal); }}
            activeOpacity={0.82}
          >
            <Text style={activityStyles.optionEmoji}>{animal.emoji}</Text>
            <Text style={activityStyles.optionName}>{animal.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  animalCircle: {
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
  animalName: { fontSize: 26, fontWeight: "800", color: THEME.text, marginTop: 10 },
});
