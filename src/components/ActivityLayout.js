import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL, GRADIENTS, THEME } from "../constants";
import { activityStyles } from "../styles/activity";

export default function ActivityLayout({ score, confettiRef, onSpeak, questionIndex, children }) {
  const insets = useSafeAreaInsets();
  const pct = (score / GAME_TOTAL) * 100;
  const currentQ = questionIndex !== undefined ? questionIndex + 1 : score + 1;

  return (
    <LinearGradient
      colors={GRADIENTS.bg}
      style={[styles.outerContainer, { paddingTop: insets.top }]}
    >
      <View style={styles.container}>
        <View style={activityStyles.header}>
          <TouchableOpacity onPress={() => router.back()} style={activityStyles.backBtn}>
            <Text style={activityStyles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            {onSpeak && (
              <TouchableOpacity onPress={onSpeak} style={styles.speakButton}>
                <Text style={styles.speakIcon}>🔊</Text>
              </TouchableOpacity>
            )}
            <LinearGradient colors={GRADIENTS.brand} style={styles.scoreBadge}>
              <Text style={styles.scoreStar}>⭐</Text>
              <Text style={styles.scoreText}>{score}/{GAME_TOTAL}</Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.questionRow}>
          <Text style={styles.questionLabel}>Question {currentQ} of {GAME_TOTAL}</Text>
        </View>

        <View style={activityStyles.progressBar}>
          <LinearGradient
            colors={GRADIENTS.brand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[activityStyles.progressFill, { width: `${pct}%` }]}
          />
        </View>

        {children}
      </View>

      <ConfettiCannon
        ref={confettiRef}
        count={120}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        fadeOut={true}
        colors={[GRADIENTS.brand[0], GRADIENTS.coral[0], GRADIENTS.gold[0], GRADIENTS.mint[0], GRADIENTS.sky[0]]}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, paddingBottom: 20 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  questionRow: { alignItems: "center", marginBottom: 6 },
  questionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: THEME.textSub,
    letterSpacing: 0.3,
  },
  speakButton: {
    width: 42,
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  speakIcon: { fontSize: 20 },
  scoreBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  scoreStar: { fontSize: 16 },
  scoreText: { fontSize: 16, fontWeight: "800", color: "#fff" },
});
