import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";
import { Button } from "../ui";
import CategoryPill from "./CategoryPill";

type CustomerSearchFilterPanelProps = {
  cuisineOptions: string[];
  selectedCuisines: string[];
  ratingOptions: string[];
  selectedRating: string;
  onCuisineToggle: (cuisine: string) => void;
  onRatingSelect: (ratingOption: string) => void;
  onClear: () => void;
  onApply: () => void;
};

export default function CustomerSearchFilterPanel({
  cuisineOptions,
  selectedCuisines,
  ratingOptions,
  selectedRating,
  onCuisineToggle,
  onRatingSelect,
  onClear,
  onApply,
}: CustomerSearchFilterPanelProps) {
  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.sectionTitle}>Cuisine</Text>
      <View style={styles.chipsWrap}>
        {cuisineOptions.map((option) => {
          const isActive = selectedCuisines.includes(option);

          return (
            <CategoryPill
              active={isActive}
              containerStyle={styles.filterChip}
              key={option}
              label={option}
              onPress={() => onCuisineToggle(option)}
            />
          );
        })}
      </View>

      <Text allowFontScaling={false} style={styles.sectionTitle}>Minimum Rating</Text>
      <View style={styles.chipsWrap}>
        {ratingOptions.map((option) => (
          <CategoryPill
            active={selectedRating === option}
            containerStyle={styles.ratingChip}
            key={option}
            label={option}
            onPress={() => onRatingSelect(option)}
          />
        ))}
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          onPress={onClear}
          style={({ pressed }) => [styles.clearButton, pressed ? styles.pressed : null]}
        >
          <Text allowFontScaling={false} style={styles.clearLabel}>Clear all</Text>
        </Pressable>

        <Button
          containerStyle={styles.applyButton}
          onPress={onApply}
          textStyle={styles.applyLabel}
          title="Apply filters"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  sectionTitle: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
    marginTop: 4,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    backgroundColor: COLORS.white,
    minHeight: 33,
    paddingHorizontal: 12,
  },
  ratingChip: {
    backgroundColor: COLORS.white,
    minHeight: 33,
    minWidth: 56,
    paddingHorizontal: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  clearButton: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    height: 44,
    justifyContent: "center",
  },
  clearLabel: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  applyButton: {
    borderRadius: 12,
    flex: 1,
    height: 44,
  },
  applyLabel: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.82,
  },
});
