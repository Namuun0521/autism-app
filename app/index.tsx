import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ACTIVITIES, CHILD_NAME_KEY, GAME_TOTAL, GRADIENTS, THEME } from "../src/constants";
import { auth } from "../src/firebase/config";
import { getActivityProgress, getTotalStars } from "../src/firebase/firestore";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [totalStars, setTotalStars] = useState(0);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [childName, setChildName] = useState<string | null>(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      router.replace("/login" as any);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
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
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []),
  );

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: () => signOut(auth) },
    ]);
  };

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
    <LinearGradient colors={GRADIENTS.bg} style={styles.gradientBg}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingSmall}>Good day! 👋</Text>
            <Text style={styles.greeting}>
              {childName || auth.currentUser?.email?.split("@")[0]}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => router.push("/Settings" as any)}
              style={styles.iconBtn}
            >
              <Text style={styles.iconBtnText}>⚙️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={styles.iconBtn}>
              <Text style={styles.iconBtnText}>🚪</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stars Hero Card */}
        <LinearGradient colors={GRADIENTS.brand} style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroLabel}>Total Stars</Text>
            <Text style={styles.heroScore}>{totalStars}</Text>
            <Text style={styles.heroSub}>Keep shining! 🚀</Text>
          </View>
          <Text style={styles.heroBigEmoji}>⭐</Text>
        </LinearGradient>

        {/* Start Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/Kids" as any)}
        >
          <LinearGradient colors={GRADIENTS.coral} style={styles.startCard}>
            <Text style={styles.startEmoji}>🧒</Text>
            <View style={styles.startText}>
              <Text style={styles.startTitle}>Start Learning!</Text>
              <Text style={styles.startSub}>Tap here to begin ✨</Text>
            </View>
            <View style={styles.startArrow}>
              <Text style={styles.startArrowText}>→</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Progress Section */}
        <Text style={styles.sectionTitle}>My Progress</Text>

        {loading ? (
          <ActivityIndicator size="large" color={THEME.brand} style={styles.loader} />
        ) : (
          ACTIVITIES.map(({ key, emoji, label, gradient }) => {
            const score = progress[key] || 0;
            const pct = Math.min((score / GAME_TOTAL) * 100, 100);
            return (
              <View key={key} style={styles.progressCard}>
                <View style={styles.progressHeader}>
                  <LinearGradient colors={gradient} style={styles.progressIconBg}>
                    <Text style={styles.progressEmoji}>{emoji}</Text>
                  </LinearGradient>
                  <Text style={styles.progressLabel}>{label}</Text>
                  <View style={styles.progressScoreBadge}>
                    <Text style={styles.progressScore}>{score}⭐</Text>
                  </View>
                </View>
                <View style={styles.progressBarBg}>
                  <LinearGradient
                    colors={gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressBarFill, { width: `${pct}%` }]}
                  />
                </View>
                <Text style={styles.progressPct}>{Math.round(pct)}% complete</Text>
              </View>
            );
          })
        )}

        {/* Footer Links */}
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

      {/* Name Modal */}
      <Modal visible={showNameModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <LinearGradient colors={GRADIENTS.brand} style={styles.modalIconBg}>
              <Text style={styles.modalEmoji}>👶</Text>
            </LinearGradient>
            <Text style={styles.modalTitle}>What's your child's name?</Text>
            <Text style={styles.modalSub}>We'll use it to greet them every day!</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter name..."
              placeholderTextColor="#C4B5FD"
              value={nameInput}
              onChangeText={setNameInput}
              autoFocus
            />
            <TouchableOpacity onPress={handleSaveName} activeOpacity={0.85}>
              <LinearGradient colors={GRADIENTS.brand} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Let's Go! 🚀</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBg: { flex: 1 },
  container: { flex: 1 },
  content: { padding: 22, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 22,
  },
  greetingSmall: { fontSize: 14, color: THEME.textSub, fontWeight: "500" },
  greeting: { fontSize: 26, fontWeight: "800", color: THEME.text, marginTop: 2 },
  headerRight: { flexDirection: "row", gap: 10, marginTop: 4 },
  iconBtn: {
    width: 42,
    height: 42,
    backgroundColor: THEME.white,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  iconBtnText: { fontSize: 18 },

  heroCard: {
    borderRadius: 28,
    padding: 28,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: THEME.brand,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  heroLeft: { flex: 1 },
  heroLabel: { fontSize: 15, color: "#D4CAFF", fontWeight: "600", marginBottom: 4 },
  heroScore: { fontSize: 56, fontWeight: "900", color: "#fff", lineHeight: 64 },
  heroSub: { fontSize: 14, color: "#C4B5FD", marginTop: 4 },
  heroBigEmoji: { fontSize: 64 },

  startCard: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#FF6B9D",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  startEmoji: { fontSize: 48 },
  startText: { flex: 1 },
  startTitle: { fontSize: 22, fontWeight: "800", color: "#fff" },
  startSub: { fontSize: 13, color: "#FFE4EE", marginTop: 2 },
  startArrow: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  startArrowText: { fontSize: 18, color: "#fff", fontWeight: "bold" },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: THEME.text,
    marginBottom: 14,
  },
  loader: { marginVertical: 32 },

  progressCard: {
    backgroundColor: THEME.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  progressIconBg: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  progressEmoji: { fontSize: 22 },
  progressLabel: { fontSize: 16, fontWeight: "700", color: THEME.text, flex: 1 },
  progressScoreBadge: {
    backgroundColor: "#EDE9FE",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  progressScore: { fontSize: 13, color: THEME.brand, fontWeight: "700" },
  progressBarBg: {
    height: 8,
    backgroundColor: "#EDE9FE",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBarFill: { height: 8, borderRadius: 8 },
  progressPct: {
    fontSize: 12,
    color: THEME.textSub,
    marginTop: 6,
    fontWeight: "500",
  },

  links: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 8,
  },
  link: { fontSize: 13, color: THEME.brand, fontWeight: "600" },
  linkDivider: { fontSize: 13, color: "#C4B5FD" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15,10,40,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalBox: {
    backgroundColor: THEME.white,
    borderRadius: 32,
    padding: 32,
    alignItems: "center",
    width: "100%",
    shadowColor: THEME.brand,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 20,
  },
  modalIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalEmoji: { fontSize: 44 },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: THEME.text,
    marginBottom: 8,
    textAlign: "center",
  },
  modalSub: {
    fontSize: 14,
    color: THEME.textSub,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 20,
  },
  modalInput: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#EDE9FE",
    borderRadius: 18,
    padding: 16,
    fontSize: 18,
    color: THEME.text,
    marginBottom: 16,
    textAlign: "center",
    backgroundColor: "#F8F6FF",
  },
  modalButton: {
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  modalButtonText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
