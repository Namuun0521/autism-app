import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL, GRADIENTS } from "../constants";
import { activityStyles } from "../styles/activity";

export default function ActivityLayout({ score, confettiRef, onSpeak, children }) {
  const insets = useSafeAreaInsets();
  const pct = (score / GAME_TOTAL) * 100;

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
        colors={["#7C5CFC", "#FF6B9D", "#F6D365", "#43E97B", "#4FACFE"]}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, paddingBottom: 20 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
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
