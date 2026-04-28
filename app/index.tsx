import { router, useFocusEffect } from "expo-router";
import { signOut } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../src/firebase/config";
import { getActivityProgress, getTotalStars } from "../src/firebase/firestore";

export default function HomeScreen() {
  const [totalStars, setTotalStars] = useState(0);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!auth.currentUser) {
      router.replace("/login" as any);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const [stars, activityProgress] = await Promise.all([
          getTotalStars(),
          getActivityProgress(),
        ]);
        setTotalStars(stars);
        setProgress(activityProgress);
      };
      fetchData();
    }, []),
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, {auth.currentUser?.email?.split("@")[0]}! 👋
        </Text>
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

      {[
        { key: "Colors", emoji: "🎨", label: "Colors" },
        { key: "Letters", emoji: "🔤", label: "Letters" },
        { key: "Numbers", emoji: "🔢", label: "Numbers" },
        { key: "Emotions", emoji: "😊", label: "Emotions" },
      ].map(({ key, emoji, label }) => {
        const score = progress[key] || 0;
        const pct = Math.min((score / 10) * 100, 100);
        return (
          <View key={key} style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressEmoji}>{emoji}</Text>
              <Text style={styles.progressLabel}>{label}</Text>
              <Text style={styles.progressScore}>{score} ⭐</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
            </View>
          </View>
        );
      })}
      <View style={styles.links}>
        <TouchableOpacity onPress={() => router.push("/Privacy" as any)}>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.linkDivider}>·</Text>
        <TouchableOpacity onPress={() => router.push("/Terms" as any)}>
          <Text style={styles.link}>Terms of Service</Text>
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
    marginTop: 48,
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
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  progressEmoji: { fontSize: 20, marginRight: 8 },
  progressLabel: { fontSize: 16, fontWeight: "bold", color: "#333", flex: 1 },
  progressScore: { fontSize: 14, color: "#6B4EFF", fontWeight: "bold" },
  progressBarBg: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: "#6B4EFF",
    borderRadius: 4,
  },
  links: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 8,
  },
  link: { fontSize: 13, color: "#6B4EFF" },
  linkDivider: { fontSize: 13, color: "#999" },
});
