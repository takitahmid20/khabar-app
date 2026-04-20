import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import { StepFlowLayout } from "../components/layout";
import { StatusBanner } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

export default function CookCompleteScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <StepFlowLayout
      actionLabel="Go to Dashboard"
      actionRightIconName="arrow-right"
      currentStep={6}
      markCurrentStepAsComplete
      onActionPress={() => navigation.navigate("Home")}
      sectionLabel="All Done!"
      totalSteps={6}
      contentContainerStyle={styles.contentContainer}
      actionContainerStyle={styles.actionButton}
      actionTextStyle={styles.actionText}
    >
      <View style={styles.successIconWrap}>
        <Feather color={COLORS.primarySoft} name="check-circle" size={42} />
      </View>

      <Text allowFontScaling={false} style={styles.heading}>You're all set!</Text>
      <Text allowFontScaling={false} style={styles.description}>
        Your profile is submitted for review. We'll notify you once your kitchen is verified (24-48 hrs). You can
        still set up your menu while waiting.
      </Text>

      <StatusBanner
        containerStyle={styles.warningBanner}
        message="Verification Pending\nYou cannot accept orders until identity and kitchen verification is complete. You'll receive an SMS update."
        messageStyle={styles.warningText}
        tone="warning"
      />
    </StepFlowLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    gap: SPACING.md,
    justifyContent: "center",
    paddingBottom: SPACING.xxl,
  },
  successIconWrap: {
    alignItems: "center",
    backgroundColor: "#D8F3DC",
    borderRadius: 999,
    height: 96,
    justifyContent: "center",
    width: 96,
  },
  heading: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 26,
    textAlign: "center",
  },
  description: {
    color: "#7A8594",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
    textAlign: "center",
  },
  warningBanner: {
    borderRadius: 14,
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  warningText: {
    fontSize: 10.5,
    fontWeight: "500",
    lineHeight: 15,
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