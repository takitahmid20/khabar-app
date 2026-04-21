import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ScreenContainer } from "../components/layout";
import { Card, TextLinkButton } from "../components/ui";
import { SPACING, COLORS } from "../constants";
import { LoginForm } from "../features/auth";
import type { RootStackParamList } from "../types";

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <View style={styles.logoWrap}>
            <Feather color={COLORS.primarySoft} name="shopping-bag" size={22} />
          </View>
          <Text allowFontScaling={false} style={styles.brandText}>Khabar</Text>
        </View>

        <Card style={styles.formCard}>
          <Text allowFontScaling={false} style={styles.title}>Sign In</Text>
          <Text allowFontScaling={false} style={styles.subtitle}>Welcome back. Login to continue.</Text>

          <LoginForm
            onSuccess={(role) => {
              if (role === "cook") {
                navigation.navigate("Home");
                return;
              }

              navigation.navigate("CustomerDashboard");
            }}
          />
        </Card>

        <View style={styles.bottomRow}>
          <Text allowFontScaling={false} style={styles.bottomHint}>No account yet?</Text>
          <TextLinkButton
            containerStyle={styles.linkButton}
            onPress={() => navigation.navigate("Signup", { role: "customer" })}
            textStyle={styles.linkText}
            title="Create Account"
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F3F4F6",
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: SPACING.md,
  },
  scrollContent: {
    flexGrow: 1,
    gap: 14,
    justifyContent: "center",
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  heroWrap: {
    alignItems: "center",
    gap: 8,
  },
  logoWrap: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  brandText: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
  },
  formCard: {
    gap: 12,
  },
  title: {
    color: "#111827",
    fontSize: 28 / 1.4,
    fontWeight: "800",
    lineHeight: 24,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  bottomRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 2,
  },
  bottomHint: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
  linkButton: {
    marginLeft: 6,
  },
  linkText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
});
