import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { StepFlowLayout } from "../components/layout";
import { SelectableChip, TextInputField } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

const NEIGHBOURHOOD_OPTIONS = [
  "Dhanmondi",
  "Gulshan",
  "Banani",
  "Uttara",
  "Mohammadpur",
  "Mirpur",
  "Rampura",
  "Bashundhara",
  "Wari",
  "Old Dhaka",
  "Others",
] as const;

const DELIVERY_RADIUS_OPTIONS = ["1 km", "2 km", "3 km", "5 km", "Others"] as const;

export default function CookServiceAreaScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState("Banani");
  const [selectedRadius, setSelectedRadius] = useState<string | null>(null);
  const [otherNeighbourhood, setOtherNeighbourhood] = useState("");
  const [otherRadius, setOtherRadius] = useState("");

  const selectedOthersNeighbourhood = selectedNeighbourhood === "Others";
  const selectedOthersRadius = selectedRadius === "Others";

  const canContinue =
    Boolean(selectedNeighbourhood) &&
    (!selectedOthersNeighbourhood || otherNeighbourhood.trim().length > 0) &&
    (!selectedOthersRadius || otherRadius.trim().length > 0);

  return (
    <StepFlowLayout
      actionDisabled={!canContinue}
      actionLabel="Continue"
      onActionPress={() => navigation.navigate("CookIdentityVerification")}
      actionRightIconName="arrow-right"
      currentStep={3}
      sectionLabel="Service Area"
      totalSteps={6}
      contentContainerStyle={styles.contentContainer}
      actionContainerStyle={styles.actionButton}
      actionTextStyle={styles.actionText}
    >
      <Text allowFontScaling={false} style={styles.heading}>Service area</Text>
      <Text allowFontScaling={false} style={styles.description}>Where are you based? We'll show you to nearby customers.</Text>

      <View style={styles.sectionBlock}>
        <Text allowFontScaling={false} style={styles.inputLabel}>Your neighbourhood</Text>
        <View style={styles.chipsWrap}>
          {NEIGHBOURHOOD_OPTIONS.map((option) => (
            <SelectableChip
              key={option}
              label={option}
              onPress={() => {
                setSelectedNeighbourhood(option);

                if (option !== "Others") {
                  setOtherNeighbourhood("");
                }
              }}
              selected={selectedNeighbourhood === option}
            />
          ))}
        </View>

        {selectedOthersNeighbourhood ? (
          <TextInputField
            label=""
            onChangeText={setOtherNeighbourhood}
            placeholder="Write your area"
            style={styles.otherInput}
            value={otherNeighbourhood}
            wrapperStyle={styles.otherInputWrap}
          />
        ) : null}
      </View>

      <View style={styles.sectionBlock}>
        <Text allowFontScaling={false} style={styles.inputLabel}>Delivery radius</Text>
        <View style={styles.radiusRow}>
          {DELIVERY_RADIUS_OPTIONS.map((radius) => (
            <SelectableChip
              key={radius}
              containerStyle={styles.radiusChip}
              label={radius}
              onPress={() => {
                setSelectedRadius(radius);

                if (radius !== "Others") {
                  setOtherRadius("");
                }
              }}
              selected={selectedRadius === radius}
              textStyle={styles.radiusChipText}
            />
          ))}
        </View>

        {selectedOthersRadius ? (
          <TextInputField
            label=""
            onChangeText={setOtherRadius}
            placeholder="Write your delivery radius"
            style={styles.otherInput}
            value={otherRadius}
            wrapperStyle={styles.otherInputWrap}
          />
        ) : null}
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
  sectionBlock: {
    gap: 10,
    marginTop: 8,
  },
  inputLabel: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  radiusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  radiusChip: {
    minWidth: 64,
  },
  radiusChipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  otherInputWrap: {
    gap: 0,
    marginTop: 2,
  },
  otherInput: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: 1,
    color: "#111827",
    fontSize: 14,
    fontWeight: "500",
    minHeight: 48,
    paddingHorizontal: 12,
  },
  actionButton: {
    borderRadius: 16,
    minHeight: 54,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
});
