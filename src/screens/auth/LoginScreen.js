import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../firebase/config";
import { GRADIENTS, THEME } from "../../constants";

function getFriendlyError(error) {
  switch (error.code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again.";
    case "auth/email-already-in-use":
      return "This email is already registered. Try signing in instead.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.replace("/");
    } catch (error) {
      Alert.alert("Oops!", getFriendlyError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={GRADIENTS.brand} style={styles.gradientBg}>
      <KeyboardAvoidingView
        style={[styles.container, { paddingTop: insets.top }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.heroSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🌟</Text>
          </View>
          <Text style={styles.appName}>LittleLearner</Text>
          <Text style={styles.tagline}>Learning made fun & magical ✨</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {isLogin ? "Welcome back!" : "Create account"}
          </Text>
          <Text style={styles.cardSub}>
            {isLogin ? "Sign in to continue" : "Start your journey today"}
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor="#C4B5FD"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#C4B5FD"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleAuth}
            disabled={loading}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={loading ? ["#C4B5FD", "#C4B5FD"] : GRADIENTS.brand}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {loading ? "Loading..." : isLogin ? "Sign In" : "Register"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.switchRow}>
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text style={styles.switchLink}>
                {isLogin ? "Register" : "Sign In"}
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.links}>
            <TouchableOpacity onPress={() => router.push("/Privacy")}>
              <Text style={styles.link}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.linkDivider}>·</Text>
            <TouchableOpacity onPress={() => router.push("/Terms")}>
              <Text style={styles.link}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBg: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 0,
  },
  heroSection: {
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 20,
  },
  logoCircle: {
    width: 90,
    height: 90,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },
  logoEmoji: { fontSize: 48 },
  appName: {
    fontSize: 36,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 32,
    paddingBottom: 48,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: -8 },
    elevation: 20,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: THEME.text,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 14,
    color: THEME.textSub,
    marginBottom: 28,
  },
  inputGroup: { marginBottom: 16 },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: THEME.text,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 2,
    borderColor: "#EDE9FE",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8F6FF",
    color: THEME.text,
  },
  button: {
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
    shadowColor: THEME.brand,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  switchRow: { marginTop: 20, alignItems: "center" },
  switchText: { fontSize: 14, color: THEME.textSub },
  switchLink: { color: THEME.brand, fontWeight: "700" },
  links: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 8,
  },
  link: { fontSize: 13, color: THEME.brand, fontWeight: "600" },
  linkDivider: { fontSize: 13, color: "#C4B5FD" },
});
