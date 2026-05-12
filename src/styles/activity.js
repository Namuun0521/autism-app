import { StyleSheet } from "react-native";
import { THEME } from "../constants";

export const activityStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg, padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    marginTop: 6,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  backArrow: { fontSize: 18 },
  back: { fontSize: 16, color: THEME.brand, fontWeight: "bold" },
  progress: { fontSize: 18, fontWeight: "bold", color: THEME.text },
  progressBar: {
    height: 10,
    backgroundColor: "#E5E0FF",
    borderRadius: 10,
    marginBottom: 22,
    overflow: "hidden",
  },
  progressFill: { height: 10, backgroundColor: THEME.brand, borderRadius: 10 },
  questionCard: {
    backgroundColor: THEME.white,
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
    marginBottom: 22,
    shadowColor: THEME.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  questionText: {
    fontSize: 15,
    color: THEME.textSub,
    marginBottom: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "center",
  },
  optionCard: {
    width: "45%",
    backgroundColor: THEME.white,
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 2.5,
    borderColor: "transparent",
  },
  optionEmoji: { fontSize: 42, marginBottom: 8 },
  optionName: { fontSize: 15, fontWeight: "700", color: THEME.text },
});

export function selectedCardStyle(isSelected, isCorrect) {
  if (!isSelected) return null;
  return {
    borderColor: isCorrect ? THEME.correct : THEME.wrong,
    backgroundColor: isCorrect ? THEME.correctBg : THEME.wrongBg,
    shadowColor: isCorrect ? THEME.correct : THEME.wrong,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  };
}
