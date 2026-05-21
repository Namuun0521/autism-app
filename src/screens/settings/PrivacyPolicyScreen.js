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

export default function PrivacyPolicyScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>

      <Text style={styles.date}>Last updated: April 2026</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>1. Information We Collect</Text>
        <Text style={styles.body}>
          We collect only the information necessary to provide our service. This
          includes your email address for account creation and your child's
          learning progress data.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>2. Children's Privacy (COPPA)</Text>
        <Text style={styles.body}>
          LittleLearner is designed for children with special learning needs. We do not collect any
          personal information directly from children. All accounts are created
          and managed by parents or guardians.{"\n\n"}
          We do not collect:{"\n"}• Child's real name{"\n"}• Child's photo{"\n"}
          • Child's location{"\n"}• Any personally identifiable information from
          children
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>3. How We Use Information</Text>
        <Text style={styles.body}>
          We use the information we collect to:{"\n"}• Provide and improve our
          learning activities{"\n"}• Track your child's learning progress{"\n"}•
          Send important app updates
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>4. Data Storage</Text>
        <Text style={styles.body}>
          Your data is stored securely using Google Firebase. We do not sell or
          share your personal information with third parties.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>5. Third-Party Advertising</Text>
        <Text style={styles.body}>
          We do not display third-party advertisements in our app. Your child's
          experience is ad-free.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>6. Contact Us</Text>
        <Text style={styles.body}>
          If you have any questions about this Privacy Policy, please contact us
          at:{"\n"}
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
