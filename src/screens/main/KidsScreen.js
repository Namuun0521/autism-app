import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ACTIVITIES, GRADIENTS, THEME } from "../../constants";

export default function KidsScreen() {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient colors={GRADIENTS.bg} style={styles.gradientBg}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.titleBlock}>
            <Text style={styles.titleSub}>Choose an activity</Text>
            <Text style={styles.title}>Let's Learn! 🌟</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {ACTIVITIES.map(({ key, emoji, label, gradient, route }) => (
            <TouchableOpacity
              key={key}
              style={styles.cardWrapper}
              onPress={() => router.push(route)}
              activeOpacity={0.82}
            >
              <LinearGradient
                colors={gradient}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.cardEmoji}>{emoji}</Text>
                <Text style={styles.cardTitle}>{label}</Text>
                <View style={styles.cardChip}>
                  <Text style={styles.cardChipText}>Start →</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBg: { flex: 1 },
  container: { flex: 1 },
  content: { padding: 22, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    gap: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    backgroundColor: THEME.white,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  backArrow: { fontSize: 20, color: THEME.text },
  titleBlock: { flex: 1 },
  titleSub: { fontSize: 13, color: THEME.textSub, fontWeight: "500" },
  title: { fontSize: 26, fontWeight: "800", color: THEME.text, marginTop: 2 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  cardWrapper: {
    width: "47%",
    borderRadius: 26,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  card: {
    borderRadius: 26,
    padding: 22,
    alignItems: "center",
    minHeight: 160,
    justifyContent: "center",
  },
  cardEmoji: { fontSize: 48, marginBottom: 10 },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.15)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  cardChip: {
    backgroundColor: "rgba(255,255,255,0.28)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  cardChipText: { fontSize: 12, fontWeight: "700", color: "#fff" },
});
