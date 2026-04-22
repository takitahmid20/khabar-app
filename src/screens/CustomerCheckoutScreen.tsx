import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "../components/layout";
import { Button, PromoCodeField } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import { type CartPlanType } from "../store/useCartStore";
import type { RootStackParamList } from "../types";

const PROMO_RULES: Record<string, { kind: "percent" | "fixed"; value: number }> = {
  MONTHLY10: { kind: "percent", value: 10 },
  MEAL100: { kind: "fixed", value: 100 },
};

type ConfirmRouteItem = RootStackParamList["CustomerCheckout"]["items"][number];

type EditableCheckoutItem = ConfirmRouteItem & {
  rowId: string;
  planType: CartPlanType;
};

function buildEditableItemId(item: ConfirmRouteItem, planType: CartPlanType): string {
  return [
    item.dishKey,
    planType,
    item.dayLabel,
    item.mealSlot,
    String(item.monthMultiplier),
  ].join("::");
}

function normalizeConfirmItems(items: ConfirmRouteItem[]): EditableCheckoutItem[] {
  return items.map((item) => {
    const planType = item.planType ?? "monthly";

    return {
      ...item,
      planType,
      rowId: buildEditableItemId(item, planType),
    };
  });
}

function getTimeChipLabel(item: EditableCheckoutItem): string {
  if (item.planType === "monthly") {
    return "Monthly";
  }

  const label = item.dayLabel.trim();
  if (!label) {
    return "Today";
  }

  return label;
}

export default function CustomerCheckoutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CustomerCheckout">>();

  const { cookId, cookName, items } = route.params;

  const [checkoutItems, setCheckoutItems] = useState<EditableCheckoutItem[]>(() => normalizeConfirmItems(items));
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);

  useEffect(() => {
    setCheckoutItems(normalizeConfirmItems(items));
  }, [items]);

  const itemCount = useMemo(() => checkoutItems.reduce((sum, item) => sum + item.quantity, 0), [checkoutItems]);

  const subtotal = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + item.unitPrice * item.quantity * item.monthMultiplier, 0);
  }, [checkoutItems]);

  const discountAmount = useMemo(() => {
    if (!appliedPromoCode) {
      return 0;
    }

    const promo = PROMO_RULES[appliedPromoCode];
    if (!promo) {
      return 0;
    }

    if (promo.kind === "percent") {
      return Math.round((subtotal * promo.value) / 100);
    }

    return Math.min(subtotal, promo.value);
  }, [appliedPromoCode, subtotal]);

  const deliveryFee = 0;
  const platformFee = subtotal > 0 ? 15 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + platformFee);

  const applyPromoCode = () => {
    const normalized = promoCodeInput.trim().toUpperCase();

    if (!normalized) {
      setAppliedPromoCode(null);
      return;
    }

    if (!PROMO_RULES[normalized]) {
      Alert.alert("Invalid code", "Promo code not found.");
      return;
    }

    setAppliedPromoCode(normalized);
  };

  const proceedToCheckout = () => {
    navigation.navigate("CustomerCheckoutDetails", {
      cookId,
      cookName,
      items: checkoutItems.map((item) => ({
        dayLabel: item.dayLabel,
        dishKey: item.dishKey,
        dishName: item.dishName,
        mealSlot: item.mealSlot,
        imageUri: item.imageUri,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        monthMultiplier: item.monthMultiplier,
        planType: item.planType,
      })),
    });
  };

  const updateItemQuantity = (rowId: string, delta: number) => {
    setCheckoutItems((previous) => previous.flatMap((item) => {
      if (item.rowId !== rowId) {
        return [item];
      }

      const nextQuantity = item.quantity + delta;

      if (nextQuantity <= 0) {
        return [];
      }

      return [
        {
          ...item,
          quantity: nextQuantity,
        },
      ];
    }));
  };

  const removeCheckoutItem = (rowId: string) => {
    setCheckoutItems((previous) => previous.filter((item) => item.rowId !== rowId));
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.backButton, pressed ? styles.pressed : null]}>
            <Feather color="#4B5563" name="arrow-left" size={22} />
          </Pressable>

          <View>
            <Text allowFontScaling={false} style={styles.pageTitle}>Your Cart</Text>
            <Text allowFontScaling={false} style={styles.pageSubtitle}>{`${itemCount} ${itemCount === 1 ? "item" : "items"}`}</Text>
          </View>
        </View>

        {checkoutItems.length > 0 ? (
          <View style={styles.bannerWrap}>
            <Text allowFontScaling={false} style={styles.bannerText}>🎉 Free delivery applied!</Text>
          </View>
        ) : null}

        <View style={styles.itemCardsWrap}>
          {checkoutItems.map((item) => {
            const lineTotal = item.unitPrice * item.quantity * item.monthMultiplier;

            return (
              <View key={item.rowId} style={styles.itemCard}>
                <Image source={{ uri: item.imageUri }} style={styles.itemImage} />

                <View style={styles.itemContentWrap}>
                  <View style={styles.itemTopRow}>
                    <View style={styles.itemTextWrap}>
                      <Text allowFontScaling={false} numberOfLines={1} style={styles.itemName}>{item.dishName}</Text>
                      <Text allowFontScaling={false} numberOfLines={1} style={styles.itemCook}>{`by ${cookName}`}</Text>

                      <View style={styles.timeChip}>
                        <Text allowFontScaling={false} style={styles.timeChipText}>{getTimeChipLabel(item)}</Text>
                      </View>
                    </View>

                    <Pressable
                      onPress={() => removeCheckoutItem(item.rowId)}
                      style={({ pressed }) => [styles.deleteButton, pressed ? styles.pressed : null]}
                    >
                      <Feather color="#EF4444" name="trash-2" size={16} />
                    </Pressable>
                  </View>

                  <View style={styles.itemBottomRow}>
                    <Text allowFontScaling={false} style={styles.priceText}>{`Tk ${lineTotal}`}</Text>

                    <View style={styles.quantityRow}>
                      <Pressable
                        onPress={() => updateItemQuantity(item.rowId, -1)}
                        style={({ pressed }) => [styles.minusButton, pressed ? styles.pressed : null]}
                      >
                        <Text allowFontScaling={false} style={styles.minusText}>−</Text>
                      </Pressable>

                      <Text allowFontScaling={false} style={styles.qtyValue}>{item.quantity}</Text>

                      <Pressable
                        onPress={() => updateItemQuantity(item.rowId, 1)}
                        style={({ pressed }) => [styles.plusButton, pressed ? styles.pressed : null]}
                      >
                        <Text allowFontScaling={false} style={styles.plusText}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}

          {checkoutItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text allowFontScaling={false} style={styles.emptyTitle}>Your cart is empty</Text>
              <Text allowFontScaling={false} style={styles.emptySubtitle}>Add items from menu to continue.</Text>
            </View>
          ) : null}
        </View>

        <PromoCodeField
          onApply={applyPromoCode}
          onChangeText={setPromoCodeInput}
          placeholder="Enter promo code"
          value={promoCodeInput}
        />

        <View style={styles.summaryCard}>
          <Text allowFontScaling={false} style={styles.summaryTitle}>Order Summary</Text>

          <SummaryRow label="Subtotal" value={`Tk ${subtotal}`} />
          <SummaryRow deliveryFree label="Delivery fee" value="Free" />
          <SummaryRow label="Platform fee" value={`Tk ${platformFee}`} />

          {discountAmount > 0 ? <SummaryRow label="Discount" value={`- Tk ${discountAmount}`} /> : null}

          <View style={styles.summaryDivider} />
          <SummaryRow bold label="Total" total value={`Tk ${grandTotal}`} />
        </View>
      </ScrollView>

      <View style={styles.bottomBarWrap}>
        <Button
          containerStyle={styles.checkoutButton}
          disabled={checkoutItems.length === 0}
          fullWidth
          onPress={proceedToCheckout}
          textStyle={styles.checkoutButtonText}
          title={`Proceed to Checkout • Tk ${grandTotal}`}
        />
      </View>
    </ScreenContainer>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  bold?: boolean;
  total?: boolean;
  deliveryFree?: boolean;
};

function SummaryRow({ label, value, bold, total, deliveryFree }: SummaryRowProps) {
  return (
    <View style={styles.summaryRow}>
      <Text allowFontScaling={false} style={[styles.summaryLabel, bold ? styles.summaryLabelBold : null]}>{label}</Text>
      <Text
        allowFontScaling={false}
        style={[
          styles.summaryValue,
          bold ? styles.summaryValueBold : null,
          total || deliveryFree ? styles.summaryValueGreen : null,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#EEF0F3",
    padding: 0,
  },
  scrollContent: {
    paddingBottom: 108,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    gap: 10,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#ECEFF2",
    borderRadius: 999,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  pageTitle: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 26,
  },
  pageSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    marginTop: 2,
  },
  bannerWrap: {
    backgroundColor: "#BDE2C2",
    borderColor: "#9ACEA4",
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  bannerText: {
    color: "#1F5135",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  itemCardsWrap: {
    gap: 10,
  },
  itemCard: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  itemImage: {
    borderRadius: 12,
    height: 72,
    width: 72,
  },
  itemContentWrap: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemTopRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTextWrap: {
    flex: 1,
    gap: 2,
    marginRight: 6,
  },
  itemName: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 20,
  },
  itemCook: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 16,
  },
  timeChip: {
    alignSelf: "flex-start",
    backgroundColor: "#E4F3EA",
    borderRadius: 999,
    marginTop: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  timeChipText: {
    color: "#2F7A58",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#FDECEC",
    borderRadius: 999,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  itemBottomRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  priceText: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 24,
  },
  quantityRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  minusButton: {
    alignItems: "center",
    backgroundColor: "#EEF1F5",
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  minusText: {
    color: "#4B5563",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },
  qtyValue: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 18,
    minWidth: 16,
    textAlign: "center",
  },
  plusButton: {
    alignItems: "center",
    backgroundColor: "#2F7A58",
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  plusText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
    minHeight: 100,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  emptyTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  emptySubtitle: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    padding: 14,
  },
  summaryTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 20,
  },
  summaryRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryLabel: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
  },
  summaryLabelBold: {
    color: "#111827",
    fontWeight: "800",
  },
  summaryValue: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  summaryValueBold: {
    fontSize: 16,
    lineHeight: 20,
  },
  summaryValueGreen: {
    color: "#2F7A58",
  },
  summaryDivider: {
    backgroundColor: "#E5E7EB",
    height: 1,
  },
  bottomBarWrap: {
    backgroundColor: "#F8F9FB",
    borderTopColor: "#E5E7EB",
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingTop: 10,
    position: "absolute",
    right: 0,
  },
  checkoutButton: {
    borderRadius: 12,
    minHeight: 56,
    paddingHorizontal: 12,
  },
  checkoutButtonText: {
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 21,
  },
  pressed: {
    opacity: 0.84,
  },
});
