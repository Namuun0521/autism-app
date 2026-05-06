import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GAME_TOTAL } from "../constants";
import { activityStyles } from "../styles/activity";

export default function ActivityLayout({ score, confettiRef, children }) {
  const insets = useSafeAreaInsets();
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
