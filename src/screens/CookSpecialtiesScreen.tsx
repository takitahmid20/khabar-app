import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { StepFlowLayout } from "../components/layout";
import { SelectableChip, TextInputField } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

const CUISINE_OPTIONS = [
  "Rice & Curry",
  "Biryani",
  "Fish Curry",
  "Halim",
  "Nihari",
  "Desserts",
  "Mughlai",
  "Vegetarian",
  "Others",
] as const;

const CAPACITY_OPTIONS = ["5", "10", "15", "20", "25", "Others"] as const;

export default function CookSpecialtiesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([
    "Rice & Curry",
    "Biryani",
    "Fish Curry",
  ]);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [otherCuisine, setOtherCuisine] = useState("");
  const [otherCapacity, setOtherCapacity] = useState("");

  const selectedOthersCuisine = selectedCuisines.includes("Others");
  const selectedOthersCapacity = selectedCapacity === "Others";

  const canContinue =
    selectedCuisines.length > 0 &&
    (!selectedOthersCuisine || otherCuisine.trim().length > 0) &&
    (!selectedOthersCapacity || otherCapacity.trim().length > 0);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((previous) => {
      if (previous.includes(cuisine)) {
        if (cuisine === "Others") {
          setOtherCuisine("");
        }

        return previous.filter((item) => item !== cuisine);
      }

      return [...previous, cuisine];
    });
  };

  const sortedSelectedCuisines = useMemo(() => selectedCuisines, [selectedCuisines]);

  return (
    <StepFlowLayout
      actionDisabled={!canContinue}
      actionLabel="Continue"
      onActionPress={() => navigation.navigate("CookServiceArea")}
      actionRightIconName="arrow-right"
      currentStep={2}
      sectionLabel="Kitchen Info"
      totalSteps={6}
      contentContainerStyle={styles.contentContainer}
      actionContainerStyle={styles.actionButton}
      actionTextStyle={styles.actionText}
    >
      <Text allowFontScaling={false} style={styles.heading}>Your kitchen specialties</Text>
      <Text allowFontScaling={false} style={styles.description}>Select the cuisines you cook best.</Text>

      <View style={styles.chipsWrap}>
        {CUISINE_OPTIONS.map((option) => (
          <SelectableChip
            key={option}
            label={option}
            onPress={() => toggleCuisine(option)}
            selected={sortedSelectedCuisines.includes(option)}
          />
        ))}
      </View>

      {selectedOthersCuisine ? (
        <TextInputField
          label=""
          onChangeText={setOtherCuisine}
          placeholder="Write your cuisine"
          style={styles.otherInput}
          value={otherCuisine}
          wrapperStyle={styles.otherInputWrap}
        />
      ) : null}

      <View style={styles.capacitySection}>
        <Text allowFontScaling={false} style={styles.inputLabel}>Capacity (meals per day)</Text>

        <View style={styles.capacityRow}>
          {CAPACITY_OPTIONS.map((capacity) => (
            <SelectableChip
              key={`capacity-${capacity}`}
              containerStyle={styles.capacityChip}
              label={capacity}
              onPress={() => {
                setSelectedCapacity(capacity);

                if (capacity !== "Others") {
                  setOtherCapacity("");
                }
              }}
              selected={selectedCapacity === capacity}
              textStyle={styles.capacityChipText}
            />
          ))}
        </View>

        {selectedOthersCapacity ? (
          <TextInputField
            keyboardType="number-pad"
            label=""
            onChangeText={setOtherCapacity}
            placeholder="Write capacity"
            style={styles.otherInput}
            value={otherCapacity}
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
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  capacitySection: {
    gap: 10,
    marginTop: 10,
  },
  inputLabel: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  capacityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  capacityChip: {
    minWidth: 54,
  },
  capacityChipText: {
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
