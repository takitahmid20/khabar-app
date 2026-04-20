import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ScreenContainer } from "../components/layout";
import { SPACING, COLORS } from "../constants";
import { LoginForm } from "../features/auth";
import type { RootStackParamList } from "../types";

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue to Khabar</Text>
        <LoginForm onSuccess={() => navigation.navigate("Home")} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.lg,
  },
  title: {
    color: COLORS.black,
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 15,
    fontWeight: "500",
  },
});
