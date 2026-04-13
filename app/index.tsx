import { router } from "expo-router";
import { signOut } from "firebase/auth";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../src/firebase/config";

export default function HomeScreen() {
  const user = auth.currentUser;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Mom! 👋</Text>
        <TouchableOpacity onPress={() => signOut(auth)}>
          <Text style={styles.signOut}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardEmoji}>🌟</Text>
        <Text style={styles.cardTitle}>Today's Tasks</Text>
        <Text style={styles.cardSubtitle}>0 tasks completed</Text>
      </View>

      <Text style={styles.sectionTitle}>Activities</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.activityCard, { backgroundColor: "#FFF0F0" }]}
          onPress={() => router.push("/Colors")}
        >
          <Text style={styles.activityEmoji}>🎨</Text>
          <Text style={styles.activityTitle}>Colors</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.activityCard, { backgroundColor: "#F0F7FF" }]}
        >
          <Text style={styles.activityEmoji}>🔤</Text>
          <Text style={styles.activityTitle}>Letters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.activityCard, { backgroundColor: "#F0FFF4" }]}
        >
          <Text style={styles.activityEmoji}>🔢</Text>
          <Text style={styles.activityTitle}>Numbers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.activityCard, { backgroundColor: "#FFF8F0" }]}
        >
          <Text style={styles.activityEmoji}>😊</Text>
          <Text style={styles.activityTitle}>Emotions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F6FF" },
  content: { padding: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 16,
  },
  greeting: { fontSize: 22, fontWeight: "bold", color: "#333" },
  signOut: { fontSize: 14, color: "#999" },
  card: {
    backgroundColor: "#6B4EFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 32,
  },
  cardEmoji: { fontSize: 40, marginBottom: 8 },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardSubtitle: { fontSize: 14, color: "#D4CAFF" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  activityCard: {
    width: "47%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  activityEmoji: { fontSize: 36, marginBottom: 8 },
  activityTitle: { fontSize: 14, fontWeight: "bold", color: "#333" },
});
