import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { GRADIENTS } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";
import { speak } from "../../utils/speech";

const CLOTHING = [
  { name: "T-Shirt",  emoji: "👕" },
  { name: "Pants",    emoji: "👖" },
  { name: "Sneakers", emoji: "👟" },
  { name: "Jacket",   emoji: "🧥" },
  { name: "Hat",      emoji: "🧢" },
  { name: "Gloves",   emoji: "🧤" },
  { name: "Scarf",    emoji: "🧣" },
  { name: "Dress",    emoji: "👗" },
];

export default function ClothingScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(CLOTHING, (c) => c.name, "Clothing", "You found all 10 clothes!", (c) => `Find the ${c.name}!`);

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>What is this?</Text>
        <LinearGradient colors={GRADIENTS.brand} style={styles.clothingCircle}>
          <Text style={styles.questionEmoji}>{question.emoji}</Text>
        </LinearGradient>
      </View>

      <View style={activityStyles.grid}>
        {options.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[
              activityStyles.optionCard,
              selectedCardStyle(selected === item.name, item.name === question.name),
            ]}
            onPress={() => { speak(item.name); handleSelect(item); }}
            activeOpacity={0.82}
          >
            <Text style={activityStyles.optionEmoji}>{item.emoji}</Text>
            <Text style={activityStyles.optionName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  clothingCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#7C5CFC",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  questionEmoji: { fontSize: 64 },
});
