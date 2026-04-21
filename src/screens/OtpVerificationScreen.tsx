import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { PreDashboardLayout } from "../components/layout";
import { TextLinkButton, VerificationCodeInput } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

export default function OtpVerificationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "OtpVerification">>();

  const { role, destination, method } = route.params;
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(22);

  useEffect(() => {
    if (secondsLeft === 0) {
      return;
    }

    const timerId = setInterval(() => {
      setSecondsLeft((previous) => (previous <= 1 ? 0 : previous - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft]);

  const subtitle = role === "cook" ? "Cook sign in" : "Customer sign in";
  const canVerify = code.length === 6;
  const iconName = method === "mobile" ? "smartphone" : "mail";
  const resendLabel = useMemo(() => {
    if (secondsLeft > 0) {
      return null;
    }

    return "Resend code";
  }, [secondsLeft]);

  const handleResend = () => {
    setCode("");
    setSecondsLeft(22);
  };

  return (
    <PreDashboardLayout
      actionDisabled={!canVerify}
      actionLabel="Verify Code"
      bottomNote={<Text style={styles.hintText}>Hint: use any 6 digits for this demo</Text>}
      onActionPress={() => {
        if (role === "cook") {
          navigation.navigate("CookName");
          return;
        }

        navigation.navigate("CustomerProfile", { mode: "onboarding" });
      }}
      onBack={() => navigation.goBack()}
      progress={0.64}
      topSubtitle={subtitle}
      topTitle="Verify OTP"
      mainContentStyle={styles.mainContent}
    >
      <View style={styles.heroIconWrap}>
        <Feather color={COLORS.primarySoft} name={iconName} size={22} />
      </View>

      <View style={styles.headingWrap}>
        <Text style={styles.heading}>Check your messages</Text>
        <Text style={styles.paragraph}>
          We sent a 6-digit code to <Text style={styles.destination}>{destination}</Text>
        </Text>
      </View>

      <VerificationCodeInput
        onChange={setCode}
        value={code}
      />

      <View style={styles.resendWrap}>
        {resendLabel ? (
          <TextLinkButton
            onPress={handleResend}
            title={resendLabel}
            textStyle={styles.resendActionText}
          />
        ) : (
          <Text style={styles.resendText}>
            Resend code in <Text style={styles.resendCountdown}>{secondsLeft}s</Text>
          </Text>
        )}
      </View>
    </PreDashboardLayout>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    gap: 22,
  },
  heroIconWrap: {
    alignItems: "center",
    backgroundColor: "#EEF9F1",
    borderRadius: 16,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  headingWrap: {
    gap: 6,
  },
  heading: {
    color: "#1F2937",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 32,
  },
  paragraph: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
  },
  destination: {
    color: "#374151",
    fontWeight: "700",
  },
  resendWrap: {
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  resendText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 21,
  },
  resendCountdown: {
    color: COLORS.primarySoft,
    fontWeight: "700",
  },
  resendActionText: {
    color: COLORS.primarySoft,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 21,
  },
  hintText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    textAlign: "center",
  },
});
