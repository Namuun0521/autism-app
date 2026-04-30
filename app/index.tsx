import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../src/firebase/config";
import { getActivityProgress, getTotalStars } from "../src/firebase/firestore";

const CHILD_NAME_KEY = "child_name";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [totalStars, setTotalStars] = useState(0);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [childName, setChildName] = useState<string | null>(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    if (!auth.currentUser) {
      router.replace("/login" as any);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const [stars, activityProgress, name] = await Promise.all([
          getTotalStars(),
          getActivityProgress(),
          AsyncStorage.getItem(CHILD_NAME_KEY),
        ]);
        setTotalStars(stars);
        setProgress(activityProgress);
        if (name) {
          setChildName(name);
        } else {
          setShowNameModal(true);
        }
      };
      fetchData();
    }, []),
  );

  const handleSaveName = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      Alert.alert("Please enter a name");
      return;
    }
    await AsyncStorage.setItem(CHILD_NAME_KEY, trimmed);
    setChildName(trimmed);
    setShowNameModal(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, {childName || auth.currentUser?.email?.split("@")[0]}! 👋
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push("/Settings" as any)}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signOut(auth)}>
            <Text style={styles.signOut}>Sign out</Text>
          </TouchableOpacity>
        </View>
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
        { key: "Shapes", emoji: "🔷", label: "Shapes" },
        { key: "Animals", emoji: "🐶", label: "Animals" },
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

      <Modal visible={showNameModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalEmoji}>👶</Text>
            <Text style={styles.modalTitle}>What's your child's name?</Text>
            <Text style={styles.modalSub}>We'll use it to greet them!</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter name..."
              placeholderTextColor="#999"
              value={nameInput}
              onChangeText={setNameInput}
              autoFocus
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSaveName}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop: 8,
  },
  greeting: { fontSize: 22, fontWeight: "bold", color: "#333" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingsIcon: { fontSize: 20 },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: "100%",
  },
  modalEmoji: { fontSize: 56, marginBottom: 12 },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSub: { fontSize: 14, color: "#999", marginBottom: 20, textAlign: "center" },
  modalInput: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 16,
    fontSize: 18,
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#6B4EFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 48,
  },
  modalButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
