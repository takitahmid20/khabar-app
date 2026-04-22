import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "../components/layout";
import { Button } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type MealSlot = "breakfast" | "lunch" | "dinner";

type MenuDish = {
  key: string;
  name: string;
  mealSlot: MealSlot;
  description: string;
  priceLabel: string;
  imageUri: string;
};

type MenuDaySection = {
  dayLabel: string;
  items: MenuDish[];
};

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const MEAL_SLOTS: Array<{ key: MealSlot; label: string }> = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

const MONTH_OCCURRENCE = 4;

function findDaySection(dayLabel: string, menuByDay: MenuDaySection[]): MenuDaySection {
  const exact = menuByDay.find((entry) => entry.dayLabel === dayLabel);

  if (exact) {
    return exact;
  }

  return (
    menuByDay[0] ?? {
      dayLabel,
      items: [],
    }
  );
}

function getInitialMealSlot(daySection: MenuDaySection): MealSlot {
  const hasLunch = daySection.items.some((item) => item.mealSlot === "lunch");
  if (hasLunch) {
    return "lunch";
  }

  const hasBreakfast = daySection.items.some((item) => item.mealSlot === "breakfast");
  if (hasBreakfast) {
    return "breakfast";
  }

  return "dinner";
}

function parsePriceLabel(priceLabel: string): number {
  const numeric = priceLabel.replace(/[^0-9]/g, "");

  if (!numeric) {
    return 0;
  }

  return Number(numeric);
}

export default function CustomerMonthlyPlanScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CustomerMonthlyPlan">>();

  const { cookId, cookName, menuByDay } = route.params;

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [slotByDay, setSlotByDay] = useState<Record<string, MealSlot>>({});
  const [selectedDishByDay, setSelectedDishByDay] = useState<Record<string, string>>({});
  const [quantityByDay, setQuantityByDay] = useState<Record<string, number>>({});

  const selectedDaySections = useMemo(() => {
    return selectedDays.map((dayLabel) => {
      const daySection = findDaySection(dayLabel, menuByDay as MenuDaySection[]);
      const selectedSlot = slotByDay[dayLabel] ?? getInitialMealSlot(daySection);
      const dishesForSlot = daySection.items.filter((item) => item.mealSlot === selectedSlot);
      const fallbackDishes = dishesForSlot.length > 0 ? dishesForSlot : daySection.items;
      const selectedDishKey = selectedDishByDay[dayLabel] ?? fallbackDishes[0]?.key;
      const selectedDish =
        fallbackDishes.find((dish) => dish.key === selectedDishKey) ?? fallbackDishes[0] ?? null;
      const quantity = Math.max(1, quantityByDay[dayLabel] ?? 1);
      const unitPrice = selectedDish ? parsePriceLabel(selectedDish.priceLabel) : 0;
      const lineTotal = unitPrice * quantity * MONTH_OCCURRENCE;

      return {
        dayLabel,
        daySection,
        selectedSlot,
        dishesForSlot,
        fallbackDishes,
        selectedDish,
        quantity,
        unitPrice,
        lineTotal,
      };
    });
  }, [menuByDay, quantityByDay, selectedDays, selectedDishByDay, slotByDay]);

  const monthlySubtotal = useMemo(() => {
    return selectedDaySections.reduce((sum, entry) => sum + entry.lineTotal, 0);
  }, [selectedDaySections]);

  const toggleDaySelection = (dayLabel: string) => {
    setSelectedDays((previous) => {
      if (previous.includes(dayLabel)) {
        const next = previous.filter((entry) => entry !== dayLabel);

        setSlotByDay((slotMap) => {
          const { [dayLabel]: removed, ...rest } = slotMap;
          void removed;
          return rest;
        });

        setSelectedDishByDay((dishMap) => {
          const { [dayLabel]: removed, ...rest } = dishMap;
          void removed;
          return rest;
        });

        setQuantityByDay((quantityMap) => {
          const { [dayLabel]: removed, ...rest } = quantityMap;
          void removed;
          return rest;
        });

        return next;
      }

      const daySection = findDaySection(dayLabel, menuByDay as MenuDaySection[]);
      const nextSlot = getInitialMealSlot(daySection);
      const nextSlotDishes = daySection.items.filter((item) => item.mealSlot === nextSlot);
      const defaultDish = (nextSlotDishes[0] ?? daySection.items[0])?.key;

      setSlotByDay((slotMap) => ({
        ...slotMap,
        [dayLabel]: nextSlot,
      }));

      if (defaultDish) {
        setSelectedDishByDay((dishMap) => ({
          ...dishMap,
          [dayLabel]: defaultDish,
        }));
      }

      setQuantityByDay((quantityMap) => ({
        ...quantityMap,
        [dayLabel]: 1,
      }));

      return [...previous, dayLabel];
    });
  };

  const handleChangeSlot = (dayLabel: string, slot: MealSlot) => {
    const daySection = findDaySection(dayLabel, menuByDay as MenuDaySection[]);
    const dishesForSlot = daySection.items.filter((item) => item.mealSlot === slot);

    setSlotByDay((previous) => ({
      ...previous,
      [dayLabel]: slot,
    }));

    if (dishesForSlot[0]) {
      setSelectedDishByDay((previous) => ({
        ...previous,
        [dayLabel]: dishesForSlot[0].key,
      }));
    }
  };

  const updateQuantity = (dayLabel: string, delta: number) => {
    setQuantityByDay((previous) => ({
      ...previous,
      [dayLabel]: Math.max(1, (previous[dayLabel] ?? 1) + delta),
    }));
  };

  const proceedToConfirm = () => {
    const confirmItems = selectedDaySections
      .filter((entry) => entry.selectedDish)
      .map((entry) => ({
        dayLabel: entry.dayLabel,
        dishKey: entry.selectedDish!.key,
        dishName: entry.selectedDish!.name,
        mealSlot: entry.selectedSlot,
        imageUri: entry.selectedDish!.imageUri,
        unitPrice: entry.unitPrice,
        quantity: entry.quantity,
        monthMultiplier: MONTH_OCCURRENCE,
        planType: "monthly" as const,
      }));

    if (confirmItems.length === 0) {
      return;
    }

    navigation.navigate("CustomerCheckout", {
      cookId,
      cookName,
      items: confirmItems,
    });
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.backButton, pressed ? styles.pressed : null]}>
            <Feather color="#374151" name="arrow-left" size={18} />
          </Pressable>

          <View style={styles.headerTextWrap}>
            <Text allowFontScaling={false} style={styles.pageTitle}>Monthly Meal Plan</Text>
            <Text allowFontScaling={false} style={styles.pageSubtitle}>{cookName}</Text>
          </View>
        </View>

        <View style={styles.sectionWrap}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>Pick Weekly Days</Text>
          <Text allowFontScaling={false} style={styles.sectionSubtitle}>Select days you want recurring meals.</Text>

          <View style={styles.daysWrap}>
            {WEEK_DAYS.map((dayLabel) => {
              const active = selectedDays.includes(dayLabel);

              return (
                <Pressable
                  key={dayLabel}
                  onPress={() => toggleDaySelection(dayLabel)}
                  style={({ pressed }) => [
                    styles.dayChip,
                    active ? styles.dayChipActive : styles.dayChipInactive,
                    pressed ? styles.pressed : null,
                  ]}
                >
                  <Text allowFontScaling={false} style={[styles.dayChipText, active ? styles.dayChipTextActive : styles.dayChipTextInactive]}>
                    {dayLabel.slice(0, 3)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionWrap}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>Auto Menu Preview</Text>
          <Text allowFontScaling={false} style={styles.sectionSubtitle}>Default picks loaded. Change slot or menu if needed.</Text>

          {selectedDaySections.length > 0 ? (
            <View style={styles.dayCardsWrap}>
              {selectedDaySections.map((entry) => (
                <View key={entry.dayLabel} style={styles.dayCard}>
                  <View style={styles.dayCardHeader}>
                    <Text allowFontScaling={false} style={styles.dayCardTitle}>{entry.dayLabel}</Text>
                    {entry.daySection.dayLabel !== entry.dayLabel ? (
                      <Text allowFontScaling={false} style={styles.dayCardHint}>{`Using ${entry.daySection.dayLabel} menu`}</Text>
                    ) : null}
                  </View>

                  <View style={styles.slotRow}>
                    {MEAL_SLOTS.map((slot) => {
                      const isActive = entry.selectedSlot === slot.key;

                      return (
                        <Pressable
                          key={`${entry.dayLabel}-${slot.key}`}
                          onPress={() => handleChangeSlot(entry.dayLabel, slot.key)}
                          style={({ pressed }) => [
                            styles.slotChip,
                            isActive ? styles.slotChipActive : styles.slotChipInactive,
                            pressed ? styles.pressed : null,
                          ]}
                        >
                          <Text allowFontScaling={false} style={[styles.slotChipText, isActive ? styles.slotChipTextActive : styles.slotChipTextInactive]}>
                            {slot.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  {entry.fallbackDishes.length > 1 ? (
                    <View style={styles.optionRow}>
                      {entry.fallbackDishes.map((dish) => {
                        const selected = entry.selectedDish?.key === dish.key;

                        return (
                          <Pressable
                            key={`${entry.dayLabel}-${dish.key}`}
                            onPress={() => {
                              setSelectedDishByDay((previous) => ({
                                ...previous,
                                [entry.dayLabel]: dish.key,
                              }));
                            }}
                            style={({ pressed }) => [
                              styles.optionChip,
                              selected ? styles.optionChipActive : styles.optionChipInactive,
                              pressed ? styles.pressed : null,
                            ]}
                          >
                            <Text allowFontScaling={false} style={[styles.optionChipText, selected ? styles.optionChipTextActive : styles.optionChipTextInactive]}>
                              {dish.name}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  ) : null}

                  {entry.selectedDish ? (
                    <>
                      <View style={styles.menuPreviewCard}>
                        <View style={styles.menuPreviewTextWrap}>
                          <Text allowFontScaling={false} style={styles.menuName}>{entry.selectedDish.name}</Text>
                          <Text allowFontScaling={false} style={styles.menuDescription}>{entry.selectedDish.description}</Text>
                          <Text allowFontScaling={false} style={styles.menuPrice}>{entry.selectedDish.priceLabel}</Text>
                        </View>

                        <Image source={{ uri: entry.selectedDish.imageUri }} style={styles.menuImage} />
                      </View>

                      <View style={styles.quantityRow}>
                        <Text allowFontScaling={false} style={styles.quantityLabel}>Quantity</Text>

                        <View style={styles.quantityControls}>
                          <Pressable onPress={() => updateQuantity(entry.dayLabel, -1)} style={({ pressed }) => [styles.quantityButton, pressed ? styles.pressed : null]}>
                            <Text allowFontScaling={false} style={styles.quantityButtonText}>-</Text>
                          </Pressable>

                          <Text allowFontScaling={false} style={styles.quantityValue}>{entry.quantity}</Text>

                          <Pressable onPress={() => updateQuantity(entry.dayLabel, 1)} style={({ pressed }) => [styles.quantityButton, pressed ? styles.pressed : null]}>
                            <Text allowFontScaling={false} style={styles.quantityButtonText}>+</Text>
                          </Pressable>
                        </View>
                      </View>

                      <View style={styles.lineTotalRow}>
                        <Text allowFontScaling={false} style={styles.lineTotalLabel}>Monthly line total</Text>
                        <Text allowFontScaling={false} style={styles.lineTotalValue}>{`Tk ${entry.lineTotal}`}</Text>
                      </View>
                    </>
                  ) : (
                    <View style={styles.emptyCard}>
                      <Text allowFontScaling={false} style={styles.emptyTitle}>No menu for this slot</Text>
                      <Text allowFontScaling={false} style={styles.emptySubtitle}>Switch slot and continue.</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptySelectionCard}>
              <Text allowFontScaling={false} style={styles.emptySelectionTitle}>No day selected yet</Text>
              <Text allowFontScaling={false} style={styles.emptySelectionSubtitle}>Choose weekly days first. Menu loads automatically.</Text>
            </View>
          )}
        </View>

        <View style={styles.totalCard}>
          <Text allowFontScaling={false} style={styles.totalTitle}>Estimated Monthly Total</Text>
          <Text allowFontScaling={false} style={styles.totalAmount}>{`Tk ${monthlySubtotal}`}</Text>
          <Text allowFontScaling={false} style={styles.totalHint}>Based on 4 weeks recurrence.</Text>
        </View>
      </ScrollView>

      <Button
        containerStyle={styles.confirmButton}
        disabled={selectedDaySections.length === 0}
        fullWidth
        onPress={proceedToConfirm}
        title="Proceed to Confirm"
      />
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
    gap: 12,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  headerTextWrap: {
    flex: 1,
  },
  pageTitle: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 26,
  },
  pageSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 1,
  },
  sectionWrap: {
    gap: 8,
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 19,
  },
  sectionSubtitle: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  daysWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dayChip: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    minHeight: 34,
    justifyContent: "center",
    minWidth: 56,
    paddingHorizontal: 12,
  },
  dayChipActive: {
    backgroundColor: COLORS.primarySoft,
    borderColor: COLORS.primarySoft,
  },
  dayChipInactive: {
    backgroundColor: "#E5E7EB",
    borderColor: "#D1D5DB",
  },
  dayChipText: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  dayChipTextActive: {
    color: COLORS.white,
  },
  dayChipTextInactive: {
    color: "#4B5563",
  },
  dayCardsWrap: {
    gap: 10,
  },
  dayCard: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    padding: 12,
  },
  dayCardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCardTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
  },
  dayCardHint: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
  },
  slotRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  slotChip: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 30,
    minWidth: 84,
    paddingHorizontal: 10,
  },
  slotChipActive: {
    backgroundColor: COLORS.primarySoft,
    borderColor: COLORS.primarySoft,
  },
  slotChipInactive: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },
  slotChipText: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
  slotChipTextActive: {
    color: COLORS.white,
  },
  slotChipTextInactive: {
    color: "#6B7280",
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  optionChip: {
    borderRadius: 999,
    borderWidth: 1,
    minHeight: 28,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  optionChipActive: {
    backgroundColor: "#E8F5EC",
    borderColor: "#C9E9D4",
  },
  optionChipInactive: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  optionChipText: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
  },
  optionChipTextActive: {
    color: COLORS.primarySoft,
  },
  optionChipTextInactive: {
    color: "#6B7280",
  },
  menuPreviewCard: {
    flexDirection: "row",
    gap: 10,
  },
  menuPreviewTextWrap: {
    flex: 1,
    gap: 4,
  },
  menuName: {
    color: "#1F2937",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
  },
  menuDescription: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 17,
  },
  menuPrice: {
    color: "#1F2937",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 17,
  },
  menuImage: {
    borderRadius: 10,
    height: 72,
    width: 72,
  },
  quantityRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantityLabel: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  quantityControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  quantityButton: {
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  quantityButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 18,
  },
  quantityValue: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    minWidth: 22,
    textAlign: "center",
  },
  lineTotalRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lineTotalLabel: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  lineTotalValue: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 17,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderRadius: 10,
    borderWidth: 1,
    gap: 2,
    minHeight: 70,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  emptyTitle: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  emptySubtitle: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 15,
    textAlign: "center",
  },
  emptySelectionCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    gap: 3,
    minHeight: 100,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  emptySelectionTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  emptySelectionSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    textAlign: "center",
  },
  totalCard: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    gap: 3,
    padding: 12,
  },
  totalTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  totalAmount: {
    color: COLORS.primarySoft,
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 26,
  },
  totalHint: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  confirmButton: {
    borderRadius: 12,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    minHeight: 48,
  },
  pressed: {
    opacity: 0.84,
  },
});
