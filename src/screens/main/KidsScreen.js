import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ACTIVITIES } from "../../constants";

export default function KidsScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Let's Learn! 🌟</Text>
      </View>

      <View style={styles.grid}>
        {ACTIVITIES.map(({ key, emoji, label, bg, route }) => (
          <TouchableOpacity
            key={key}
            style={[styles.card, { backgroundColor: bg }]}
            onPress={() => router.push(route)}
          >
            <Text style={styles.cardEmoji}>{emoji}</Text>
            <Text style={styles.cardTitle}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFBF0" },
  content: { padding: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
    gap: 16,
  },
  back: { fontSize: 16, color: "#6B4EFF", fontWeight: "bold" },
  title: { fontSize: 26, fontWeight: "bold", color: "#333" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  card: {
    width: "47%",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardEmoji: { fontSize: 44, marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
});
