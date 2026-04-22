import { router, useFocusEffect } from "expo-router";
import { signOut } from "firebase/auth";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../src/firebase/config";
import { getTotalStars } from "../src/firebase/firestore";

export default function HomeScreen() {
  const [totalStars, setTotalStars] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchStars = async () => {
        const stars = await getTotalStars();
        setTotalStars(stars);
      };
      fetchStars();
    }, []),
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Mom! 👋</Text>
        <TouchableOpacity onPress={() => signOut(auth)}>
          <Text style={styles.signOut}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardEmoji}>⭐</Text>
        <Text style={styles.cardTitle}>Total Stars</Text>
        <Text style={styles.cardScore}>{totalStars}</Text>
        <Text style={styles.cardSubtitle}>Keep going! 🚀</Text>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.push("/Kids" as any)}
      >
        <Text style={styles.startEmoji}>🧒</Text>
        <Text style={styles.startTitle}>Start Learning!</Text>
        <Text style={styles.startSub}>Tap here to begin</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Progress</Text>

      <View style={styles.progressCard}>
        <Text style={styles.progressText}>⭐ {totalStars} stars collected</Text>
        <Text style={styles.progressSub}>Keep practicing every day!</Text>
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
    marginBottom: 24,
  },
  cardEmoji: { fontSize: 40, marginBottom: 8 },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardScore: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardSubtitle: { fontSize: 14, color: "#D4CAFF" },
  startButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#FF6B6B",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  startEmoji: { fontSize: 56, marginBottom: 8 },
  startTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  startSub: { fontSize: 14, color: "#FFE0E0" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  progressText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  progressSub: { fontSize: 14, color: "#999" },
});
