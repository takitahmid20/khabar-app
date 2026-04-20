import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { StepFlowLayout } from "../components/layout";
import { RadioOptionCard, TextInputField } from "../components/ui";
import { COLORS, RADIUS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

const PAYOUT_OPTIONS = ["bKash", "Nagad", "Bank Account", "Others"] as const;

export default function CookPayoutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedMethod, setSelectedMethod] = useState<(typeof PAYOUT_OPTIONS)[number]>("bKash");
  const [otherMethod, setOtherMethod] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const selectedOthersMethod = selectedMethod === "Others";

  const numberLabel = useMemo(() => {
    if (selectedMethod === "Bank Account") {
      return "Bank Account Number";
    }

    if (selectedMethod === "Others") {
      return `${otherMethod.trim() || "Payout"} Account Number`;
    }

    return `${selectedMethod} Account Number`;
  }, [otherMethod, selectedMethod]);

  return (
    <StepFlowLayout
      actionDisabled={selectedOthersMethod && otherMethod.trim().length === 0}
      actionLabel="Complete Setup"
      onActionPress={() => navigation.navigate("CookComplete")}
      currentStep={5}
      sectionLabel="Payout Setup"
      totalSteps={6}
      contentContainerStyle={styles.contentContainer}
      actionContainerStyle={styles.actionButton}
      actionTextStyle={styles.actionText}
    >
      <Text allowFontScaling={false} style={styles.heading}>Set up your payout</Text>
      <Text allowFontScaling={false} style={styles.description}>Tell us where to send your earnings. Payouts every Monday.</Text>

      <View style={styles.optionsWrap}>
        {PAYOUT_OPTIONS.map((option) => (
          <RadioOptionCard
            key={option}
            label={option}
            onPress={() => {
              setSelectedMethod(option);

              if (option !== "Others") {
                setOtherMethod("");
              }
            }}
            selected={selectedMethod === option}
          />
        ))}
      </View>

      {selectedOthersMethod ? (
        <TextInputField
          label=""
          onChangeText={setOtherMethod}
          placeholder="Write payout method"
          style={styles.otherInput}
          value={otherMethod}
          wrapperStyle={styles.otherInputWrap}
        />
      ) : null}

      <View style={styles.accountBlock}>
        <Text allowFontScaling={false} style={styles.inputLabel}>{numberLabel}</Text>

        <View style={styles.accountRow}>
          <View style={styles.countryCodeBox}>
        <Text allowFontScaling={false} style={styles.countryCodeText}>+880</Text>
          </View>

          <TextInputField
            keyboardType="number-pad"
            label=""
            onChangeText={setAccountNumber}
            placeholder="1XXXXXXXXX"
            style={styles.numberInput}
            value={accountNumber}
            wrapperStyle={styles.numberInputWrap}
          />
        </View>
      </View>
    </StepFlowLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  heading: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
  },
  description: {
    color: "#7A8594",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  optionsWrap: {
    gap: 8,
    marginTop: 4,
  },
  accountBlock: {
    gap: 8,
    marginTop: 8,
  },
  inputLabel: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  accountRow: {
    flexDirection: "row",
    gap: 8,
  },
  countryCodeBox: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: 10,
    width: 70,
  },
  countryCodeText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  numberInputWrap: {
    flex: 1,
    gap: 0,
  },
  numberInput: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    color: "#111827",
    fontSize: 14,
    fontWeight: "500",
    minHeight: 50,
    paddingHorizontal: 12,
  },
  otherInputWrap: {
    gap: 0,
  },
  otherInput: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    color: "#111827",
    fontSize: 14,
    fontWeight: "500",
    minHeight: 48,
    paddingHorizontal: 12,
  },
  actionButton: {
    borderRadius: 12,
    minHeight: 50,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
});
