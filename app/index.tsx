import { signOut } from "firebase/auth";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../src/firebase/config";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧩 Autism App</Text>
      <Text style={styles.subtitle}>Welcome! 🎉</Text>
      <TouchableOpacity style={styles.button} onPress={() => signOut(auth)}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6B4EFF",
    marginBottom: 16,
  },
  subtitle: { fontSize: 18, color: "#333", marginBottom: 32 },
  button: {
    backgroundColor: "#6B4EFF",
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 32,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
