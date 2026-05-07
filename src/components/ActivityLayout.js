import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL } from "../constants";
import { activityStyles } from "../styles/activity";

export default function ActivityLayout({ score, confettiRef, onSpeak, children }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[activityStyles.container, { paddingTop: insets.top }]}>
      <View style={activityStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={activityStyles.back}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          {onSpeak && (
            <TouchableOpacity onPress={onSpeak} style={styles.speakButton}>
              <Text style={styles.speakIcon}>🔊</Text>
            </TouchableOpacity>
          )}
          <Text style={activityStyles.progress}>
            {score} / {GAME_TOTAL} ⭐
          </Text>
        </View>
      </View>
      <View style={activityStyles.progressBar}>
        <View
          style={[activityStyles.progressFill, { width: `${(score / GAME_TOTAL) * 100}%` }]}
        />
      </View>
      {children}
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
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  speakButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  speakIcon: { fontSize: 18 },
});
