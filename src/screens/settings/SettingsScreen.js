import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { deleteUser } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CHILD_NAME_KEY, GRADIENTS, THEME } from "../../constants";
import { auth } from "../../firebase/config";
import { deleteUserData } from "../../firebase/firestore";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your account and all progress data. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteUserData();
              await deleteUser(auth.currentUser);
              await AsyncStorage.removeItem(CHILD_NAME_KEY);
              router.replace("/login");
            } catch (error) {
              if (error.code === "auth/requires-recent-login") {
                Alert.alert(
                  "Sign in required",
                  "Please sign out and sign back in, then try again.",
                );
              } else {
                Alert.alert("Error", "Could not delete account. Please try again.");
              }
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  useEffect(() => {
    AsyncStorage.getItem(CHILD_NAME_KEY).then((val) => {
      if (val) setName(val);
    });
  }, []);

  const handleSave = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      Alert.alert("Please enter a name");
      return;
    }
    await AsyncStorage.setItem(CHILD_NAME_KEY, trimmed);
    setName(trimmed);
    setEditing(false);
  };

  return (
    <LinearGradient colors={GRADIENTS.bg} style={styles.gradientBg}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.container, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.card}>
          <LinearGradient colors={GRADIENTS.violet} style={styles.cardIconBg}>
            <Text style={styles.cardIcon}>👤</Text>
          </LinearGradient>
          <Text style={styles.label}>Child's Name</Text>
          {editing ? (
            <>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Enter name..."
                placeholderTextColor="#C4B5FD"
                autoFocus
              />
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={() => setEditing(false)}
                >
                  <Text style={styles.btnCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.btnSaveWrapper} activeOpacity={0.85}>
                  <LinearGradient colors={GRADIENTS.brand} style={styles.btnSave}>
                    <Text style={styles.btnSaveText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>{name || "Not set"}</Text>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => {
                  setInput(name);
                  setEditing(true);
                }}
              >
                <Text style={styles.editBtnText}>Edit ✏️</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={handleDeleteAccount}
          disabled={deleting}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteBtnText}>
            {deleting ? "Deleting..." : "Delete Account"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBg: { flex: 1 },
  scroll: { flex: 1 },
  container: { padding: 22, paddingBottom: 48 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
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
  title: { fontSize: 26, fontWeight: "800", color: THEME.text },
  card: {
    backgroundColor: THEME.white,
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    shadowColor: THEME.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cardIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cardIcon: { fontSize: 30 },
  label: {
    fontSize: 13,
    color: THEME.textSub,
    marginBottom: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  nameText: { fontSize: 22, fontWeight: "800", color: THEME.text },
  editBtn: {
    backgroundColor: "#EDE9FE",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editBtnText: { color: THEME.brand, fontWeight: "700", fontSize: 14 },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#EDE9FE",
    borderRadius: 16,
    padding: 16,
    fontSize: 18,
    color: THEME.text,
    marginBottom: 14,
    textAlign: "center",
    backgroundColor: "#F8F6FF",
  },
  row: { flexDirection: "row", gap: 12, width: "100%" },
  btnCancel: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#F5F3FF",
  },
  btnCancelText: { color: THEME.textSub, fontWeight: "700" },
  btnSaveWrapper: { flex: 1, borderRadius: 16, overflow: "hidden" },
  btnSave: {
    padding: 16,
    alignItems: "center",
  },
  btnSaveText: { color: "#fff", fontWeight: "800" },
  deleteBtn: {
    marginTop: 32,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    backgroundColor: "#FFF0F0",
    borderWidth: 1.5,
    borderColor: "#FFCDD2",
  },
  deleteBtnText: { color: "#D32F2F", fontSize: 16, fontWeight: "700" },
});
