import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "../../components/ActivityLayout";
import { GRADIENTS } from "../../constants";
import { useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";
import { speak } from "../../utils/speech";

const VEHICLES = [
  { name: "Car",         emoji: "🚗" },
  { name: "Bus",         emoji: "🚌" },
  { name: "Airplane",    emoji: "✈️" },
  { name: "Train",       emoji: "🚂" },
  { name: "Boat",        emoji: "🚢" },
  { name: "Helicopter",  emoji: "🚁" },
  { name: "Bicycle",     emoji: "🚲" },
  { name: "Fire Truck",  emoji: "🚒" },
];

export default function VehiclesScreen() {
  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion } =
    useActivityGame(VEHICLES, (v) => v.name, "Vehicles", "You found all 10 vehicles!", (v) => `Find the ${v.name}!`);

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>What is this?</Text>
        <LinearGradient colors={GRADIENTS.sky} style={styles.vehicleCircle}>
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
  vehicleCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#4FACFE",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  questionEmoji: { fontSize: 64 },
});
