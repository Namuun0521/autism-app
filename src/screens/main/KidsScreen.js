import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function KidsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Let's Learn! 🌟</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FFD6D6" }]}
          onPress={() => router.push("/Colors")}
        >
          <Text style={styles.cardEmoji}>🎨</Text>
          <Text style={styles.cardTitle}>Colors</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#D6E8FF" }]}
          onPress={() => router.push("/Letters")}
        >
          <Text style={styles.cardEmoji}>🔤</Text>
          <Text style={styles.cardTitle}>Letters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#D6FFE8" }]}
          onPress={() => router.push("/Numbers")}
        >
          <Text style={styles.cardEmoji}>🔢</Text>
          <Text style={styles.cardTitle}>Numbers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FFF3D6" }]}
          onPress={() => router.push("/Emotions")}
        >
          <Text style={styles.cardEmoji}>😊</Text>
          <Text style={styles.cardTitle}>Emotions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#E8D6FF" }]}
          onPress={() => router.push("/Shapes")}
        >
          <Text style={styles.cardEmoji}>🔷</Text>
          <Text style={styles.cardTitle}>Shapes</Text>
        </TouchableOpacity>
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
    marginTop: 48,
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
