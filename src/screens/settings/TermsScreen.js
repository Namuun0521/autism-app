import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { THEME } from "../../constants";

export default function TermsScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Terms of Service</Text>
      </View>

      <Text style={styles.date}>Last updated: April 2026</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>1. Acceptance of Terms</Text>
        <Text style={styles.body}>
          By using this app, you agree to these Terms of Service. If you do not
          agree, please do not use the app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>2. Use of the App</Text>
        <Text style={styles.body}>
          Autismo is designed to support children in learning colors,
          letters, numbers, shapes, animals, and emotions. The app is intended
          to be used under parental supervision.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>3. Subscriptions and Payments</Text>
        <Text style={styles.body}>
          Some features may require a paid subscription. Subscriptions are
          billed through the App Store or Google Play. You may cancel your
          subscription at any time through your App Store or Google Play account
          settings.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>4. Refund Policy</Text>
        <Text style={styles.body}>
          Refunds are handled by Apple App Store or Google Play Store according
          to their respective refund policies.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>5. Disclaimer</Text>
        <Text style={styles.body}>
          This app is a supplementary learning tool and is not a substitute for
          professional medical or therapeutic advice. Please consult with
          healthcare professionals for your child's specific needs.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>6. Contact Us</Text>
        <Text style={styles.body}>
          If you have any questions about these Terms, please contact us at:
          {"\n"}
          turboldnamuun@gmail.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  content: { padding: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 16,
    gap: 16,
  },
  back: { fontSize: 16, color: THEME.brand, fontWeight: "bold" },
  title: { fontSize: 22, fontWeight: "bold", color: THEME.text },
  date: { fontSize: 13, color: THEME.textSub, marginBottom: 24 },
  section: { marginBottom: 24 },
  heading: { fontSize: 16, fontWeight: "bold", color: THEME.text, marginBottom: 8 },
  body: { fontSize: 14, color: THEME.textSub, lineHeight: 22 },
});
