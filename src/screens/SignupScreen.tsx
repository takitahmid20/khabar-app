import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { PreDashboardLayout } from "../components/layout";
import { TextInputField, TextLinkButton } from "../components/ui";
import { COLORS, RADIUS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type SignupMode = "mobile" | "email";

export default function SignupScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Signup">>();

  const [mode, setMode] = useState<SignupMode>("mobile");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const role = route.params.role;
  const sanitizedPhone = useMemo(() => phoneNumber.replace(/[^\d]/g, ""), [phoneNumber]);
  const canSubmit = useMemo(() => {
    if (mode === "mobile") {
      return sanitizedPhone.length === 10;
    }

    return /\S+@\S+\.\S+/.test(email.trim());
  }, [email, mode, sanitizedPhone.length]);

  const topTitle = mode === "mobile" ? "Enter your number" : "Enter your email";
  const topSubtitle = role === "cook" ? "Cook registration" : "Customer registration";
  const heading = mode === "mobile" ? "What's your number?" : "What's your email?";
  const paragraph =
    mode === "mobile"
      ? "We'll send a one-time code to verify your account.\nNo spam, ever."
      : "We'll send a one-time link to verify your account.\nNo spam, ever.";

  return (
    <PreDashboardLayout
      actionContainerStyle={styles.sendButton}
      actionDisabled={!canSubmit}
      actionLabel="Send Code"
      actionRightIconName="chevron-right"
      actionTextStyle={styles.sendButtonText}
      bottomNote={
        <Text style={styles.footnote}>
          By continuing, you agree to receive {mode === "mobile" ? "SMS" : "email"} for verification.
        </Text>
      }
      onActionPress={() =>
        navigation.navigate("OtpVerification", {
          role,
          method: mode,
          destination: mode === "mobile" ? `+880 ${sanitizedPhone}` : email.trim(),
        })
      }
      onBack={() => navigation.goBack()}
      progress={0.35}
      topSubtitle={topSubtitle}
      topTitle={topTitle}
    >
      <View style={styles.heroIconWrap}>
        <Feather color={COLORS.primarySoft} name={mode === "mobile" ? "phone" : "mail"} size={30} />
      </View>

      <View style={styles.headingBlock}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.paragraph}>{paragraph}</Text>
      </View>

      {mode === "mobile" ? (
        <View style={styles.phoneRow}>
          <View style={styles.countryCodeBox}>
            <Feather color={COLORS.primarySoft} name="flag" size={14} />
            <Text style={styles.countryCodeText}>+880</Text>
          </View>

          <TextInputField
            keyboardType="number-pad"
            label=""
            maxLength={10}
            onChangeText={setPhoneNumber}
            placeholder="1XXXXXXXXX"
            style={styles.phoneInput}
            value={phoneNumber}
            wrapperStyle={styles.inlineInputWrapper}
          />
        </View>
      ) : (
        <TextInputField
          autoCapitalize="none"
          keyboardType="email-address"
          label=""
          onChangeText={setEmail}
          placeholder="name@example.com"
          style={styles.emailInput}
          value={email}
          wrapperStyle={styles.fullInputWrapper}
        />
      )}

      <TextLinkButton
        containerStyle={styles.switchLinkButton}
        onPress={() => setMode((prev) => (prev === "mobile" ? "email" : "mobile"))}
        title={mode === "mobile" ? "Use email" : "Use mobile number"}
        textStyle={styles.switchLinkText}
      />
    </PreDashboardLayout>
  );
}

const styles = StyleSheet.create({
  heroIconWrap: {
    alignItems: "center",
    backgroundColor: COLORS.successSoft,
    borderRadius: 16,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  headingBlock: {
    gap: 6,
  },
  heading: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 33,
  },
  paragraph: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
  },
  phoneRow: {
    flexDirection: "row",
    gap: 8,
  },
  inlineInputWrapper: {
    flex: 1,
    gap: 0,
  },
  fullInputWrapper: {
    gap: 0,
  },
  countryCodeBox: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: 12,
    width: 90,
  },
  countryCodeText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },
  phoneInput: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    color: "#111827",
    flex: 1,
    fontSize: 17,
    fontWeight: "500",
    minHeight: 56,
    paddingHorizontal: 16,
  },
  emailInput: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    color: "#111827",
    fontSize: 17,
    fontWeight: "500",
    minHeight: 56,
    paddingHorizontal: 16,
  },
  switchLinkButton: {
    marginTop: -8,
    paddingVertical: 2,
  },
  switchLinkText: {
    color: COLORS.primarySoft,
    fontSize: 14,
    fontWeight: "600",
  },
  sendButton: {
    borderRadius: 16,
    minHeight: 56,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  footnote: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    textAlign: "center",
  },
});
