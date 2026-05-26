import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActivityLayout from "./ActivityLayout";
import { THEME } from "../constants";
import { useActivityGame } from "../hooks/useActivityGame";
import { activityStyles, selectedCardStyle } from "../styles/activity";
import { speak } from "../utils/speech";

export default function EmojiActivityScreen({
  items,
  gradient,
  questionLabel,
  activityName,
  completionMessage,
  getSpeechText,
  getSubLabel,
}) {
  const getSubLabelFn = getSubLabel ?? ((x) => x.name);
  const getSpeechTextFn = getSpeechText ?? ((x) => `Find the ${x.name}!`);

  const { selected, score, question, options, confettiRef, handleSelect, speakQuestion, questionIndex } =
    useActivityGame(items, (x) => x.name, activityName, completionMessage, getSpeechTextFn);

  return (
    <ActivityLayout score={score} confettiRef={confettiRef} onSpeak={speakQuestion} questionIndex={questionIndex}>
      <View style={activityStyles.questionCard}>
        <Text style={activityStyles.questionText}>{questionLabel}</Text>
        <LinearGradient colors={gradient} style={styles.circle}>
          <Text style={styles.questionEmoji}>{question.emoji}</Text>
        </LinearGradient>
        <Text style={styles.subLabel}>{getSubLabelFn(question)}</Text>
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
  circle: {
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
  subLabel: { fontSize: 26, fontWeight: "800", color: THEME.text, marginTop: 10 },
});
