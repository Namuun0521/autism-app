import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CHILD_NAME_KEY } from "../../constants";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");

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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Child's Name</Text>
        {editing ? (
          <>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Enter name..."
              placeholderTextColor="#999"
              autoFocus
            />
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.btn, styles.btnCancel]}
                onPress={() => setEditing(false)}
              >
                <Text style={styles.btnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={handleSave}>
                <Text style={styles.btnSaveText}>Save</Text>
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
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F6FF", padding: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 8,
    gap: 16,
  },
  back: { fontSize: 16, color: "#6B4EFF", fontWeight: "bold" },
  title: { fontSize: 24, fontWeight: "bold", color: "#333" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  label: { fontSize: 13, color: "#999", marginBottom: 12, fontWeight: "600" },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameText: { fontSize: 20, fontWeight: "bold", color: "#333" },
  editBtn: {
    backgroundColor: "#F0EDFF",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  editBtnText: { color: "#6B4EFF", fontWeight: "bold" },
  input: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    padding: 14,
    fontSize: 18,
    color: "#333",
    marginBottom: 12,
  },
  row: { flexDirection: "row", gap: 12 },
  btn: { flex: 1, borderRadius: 14, padding: 14, alignItems: "center" },
  btnCancel: { backgroundColor: "#F5F5F5" },
  btnSave: { backgroundColor: "#6B4EFF" },
  btnCancelText: { color: "#666", fontWeight: "bold" },
  btnSaveText: { color: "#fff", fontWeight: "bold" },
});
