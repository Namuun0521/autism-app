import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth } from "../../firebase/config";
import { GRADIENTS, THEME } from "../../constants";

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      Alert.alert("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, trimmed);
      setSent(true);
    } catch (error) {
      const msg =
        error.code === "auth/user-not-found" || error.code === "auth/invalid-email"
          ? "No account found with that email address."
          : "Something went wrong. Please try again.";
      Alert.alert("Oops!", msg);
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
            <Text style={styles.logoEmoji}>🔑</Text>
          </View>
          <Text style={styles.appName}>Autismo</Text>
          <Text style={styles.tagline}>Reset your password</Text>
        </View>

        <View style={styles.card}>
          {sent ? (
            <View style={styles.successBox}>
              <Text style={styles.successIcon}>✅</Text>
              <Text style={styles.successTitle}>Email Sent!</Text>
              <Text style={styles.successBody}>
                Check your inbox for a password reset link. It may take a few minutes to arrive.
              </Text>
              <TouchableOpacity onPress={() => router.back()} activeOpacity={0.85}>
                <LinearGradient colors={GRADIENTS.brand} style={styles.button}>
                  <Text style={styles.buttonText}>Back to Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.cardTitle}>Forgot Password?</Text>
              <Text style={styles.cardSub}>
                Enter your email and we'll send you a reset link.
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
                  autoFocus
                />
              </View>

              <TouchableOpacity
                onPress={handleReset}
                disabled={loading}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={loading ? ["#C4B5FD", "#C4B5FD"] : GRADIENTS.brand}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.back()} style={styles.backRow}>
                <Text style={styles.backText}>← Back to Sign In</Text>
              </TouchableOpacity>
            </>
          )}
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
    lineHeight: 20,
  },
  inputGroup: { marginBottom: 20 },
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
    shadowColor: THEME.brand,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  backRow: { marginTop: 20, alignItems: "center" },
  backText: { fontSize: 14, color: THEME.brand, fontWeight: "600" },
  successBox: { alignItems: "center", paddingVertical: 8 },
  successIcon: { fontSize: 56, marginBottom: 16 },
  successTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: THEME.text,
    marginBottom: 12,
  },
  successBody: {
    fontSize: 15,
    color: THEME.textSub,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
});
