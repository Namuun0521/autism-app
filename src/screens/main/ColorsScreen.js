import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL, useActivityGame } from "../../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../../styles/activity";

const COLORS = [
  { name: "Red", hex: "#FF6B6B", emoji: "🔴" },
  { name: "Blue", hex: "#87CEEB", emoji: "🔵" },
  { name: "Yellow", hex: "#FFE66D", emoji: "🟡" },
  { name: "Green", hex: "#95E77E", emoji: "🟢" },
  { name: "Purple", hex: "#B8A9FF", emoji: "🟣" },
  { name: "Orange", hex: "#FFA07A", emoji: "🟠" },
];

export default function ColorsScreen() {
  const insets = useSafeAreaInsets();
  const { selected, score, question, options, confettiRef, handleSelect } =
    useActivityGame(COLORS, (c) => c.name, "Colors", "You found all 10 colors!");

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
        <Text style={activityStyles.questionText}>Find this color!</Text>
        <View style={[styles.colorCircle, { backgroundColor: question.hex }]} />
        <Text style={styles.colorName}>{question.name}</Text>
      </View>

      <View style={activityStyles.grid}>
        {options.map((color) => (
          <TouchableOpacity
            key={color.name}
            style={[
              activityStyles.optionCard,
              { backgroundColor: color.hex },
              selectedCardStyle(selected === color.name, color.name === question.name),
            ]}
            onPress={() => handleSelect(color)}
          >
            <Text style={styles.colorEmoji}>{color.emoji}</Text>
            <Text style={styles.colorLabel}>{color.name}</Text>
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
  colorCircle: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  colorName: { fontSize: 24, fontWeight: "bold", color: "#333" },
  colorEmoji: { fontSize: 32, marginBottom: 8 },
  colorLabel: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
