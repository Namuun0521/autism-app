import { Stack } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { auth } from "../src/firebase/config";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="Privacy" />
      <Stack.Screen name="Terms" />
      <Stack.Screen name="Colors" />
      <Stack.Screen name="Letters" />
      <Stack.Screen name="Numbers" />
      <Stack.Screen name="Emotions" />
      <Stack.Screen name="Kids" />
      <Stack.Screen name="Shapes" />
      <Stack.Screen name="Animals" />
      <Stack.Screen name="BodyParts" />
      <Stack.Screen name="BasicNeeds" />
      <Stack.Screen name="Clothing" />
      <Stack.Screen name="Vehicles" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="ForgotPassword" />
    </Stack>
  );
}
