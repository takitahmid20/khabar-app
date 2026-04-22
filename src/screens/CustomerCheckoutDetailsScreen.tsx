import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "../components/layout";
import { Button, PromoCodeField } from "../components/ui";
import { COLORS, SPACING } from "../constants";
import type { RootStackParamList } from "../types";

type AddressKey = "home" | "office";
type PaymentKey = "bkash" | "nagad" | "card";

const PROMO_RULES: Record<string, { kind: "percent" | "fixed"; value: number }> = {
  KHABAR20: { kind: "percent", value: 20 },
};

const PAYMENT_OPTIONS: Array<{
  key: PaymentKey;
  title: string;
  subtitle: string;
  caption: string;
  icon: React.ComponentProps<typeof Feather>["name"];
}> = [
  {
    key: "bkash",
    title: "bKash",
    subtitle: "bKash",
    caption: "Pay with bKash mobile banking",
    icon: "smartphone",
  },
  {
    key: "nagad",
    title: "Nagad",
    subtitle: "Nagad",
    caption: "Pay with Nagad digital wallet",
    icon: "smartphone",
  },
  {
    key: "card",
    title: "Debit / Credit Card",
    subtitle: "Visa, Mastercard, Amex",
    caption: "",
    icon: "credit-card",
  },
];

const ADDRESS_OPTIONS: Array<{
  key: AddressKey;
  title: string;
  line1: string;
  isDefault?: boolean;
}> = [
  {
    key: "home",
    title: "Home",
    line1: "House 12, Road 4, Dhanmondi, Dhaka-1209",
    isDefault: true,
  },
  {
    key: "office",
    title: "Office",
    line1: "Level 8, Rupayan Tower, Bangla Motor, Dhaka-1000",
  },
];

export default function CustomerCheckoutDetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CustomerCheckoutDetails">>();

  const { items } = route.params;

  const [selectedAddress, setSelectedAddress] = useState<AddressKey>("home");
  const [selectedPayment, setSelectedPayment] = useState<PaymentKey>("bkash");
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity * item.monthMultiplier, 0);
  }, [items]);

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
  const total = Math.max(0, subtotal - discountAmount + deliveryFee + platformFee);

  const paymentTitle = PAYMENT_OPTIONS.find((option) => option.key === selectedPayment)?.title ?? "bKash";

  const applyPromo = () => {
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

  const placeOrder = () => {
    Alert.alert("Order placed", `Payment confirmed via ${paymentTitle}.`, [
      {
        text: "OK",
        onPress: () => navigation.navigate("CustomerDashboard"),
      },
    ]);
  };

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.backButton, pressed ? styles.pressed : null]}>
            <Feather color="#4B5563" name="arrow-left" size={21} />
          </Pressable>

          <Text allowFontScaling={false} style={styles.pageTitle}>Checkout</Text>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text allowFontScaling={false} style={styles.sectionTitle}>Delivery Address</Text>
            <Pressable style={({ pressed }) => [styles.sectionActionButton, pressed ? styles.pressed : null]}>
              <Text allowFontScaling={false} style={styles.sectionActionText}>Change</Text>
            </Pressable>
          </View>

          <View style={styles.addressCardsWrap}>
            {ADDRESS_OPTIONS.map((address) => {
              const selected = selectedAddress === address.key;

              return (
                <Pressable
                  key={address.key}
                  onPress={() => setSelectedAddress(address.key)}
                  style={({ pressed }) => [
                    styles.addressCard,
                    selected ? styles.addressCardSelected : null,
                    pressed ? styles.pressed : null,
                  ]}
                >
                  <View style={styles.addressTopRow}>
                    <Text allowFontScaling={false} style={styles.addressTitle}>{address.title}</Text>
                    {address.isDefault ? <Text allowFontScaling={false} style={styles.defaultChip}>DEFAULT</Text> : null}
                  </View>
                  <Text allowFontScaling={false} style={styles.addressLine}>{address.line1}</Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable style={({ pressed }) => [styles.addAddressButton, pressed ? styles.pressed : null]}>
            <Text allowFontScaling={false} style={styles.addAddressText}>+ Add new address</Text>
          </Pressable>
        </View>

        <View style={styles.sectionCard}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>Payment Method</Text>

          <View style={styles.paymentOptionsWrap}>
            {PAYMENT_OPTIONS.map((option) => {
              const selected = selectedPayment === option.key;

              return (
                <Pressable
                  key={option.key}
                  onPress={() => setSelectedPayment(option.key)}
                  style={({ pressed }) => [
                    styles.paymentOptionCard,
                    selected ? styles.paymentOptionCardSelected : null,
                    pressed ? styles.pressed : null,
                  ]}
                >
                  <View style={styles.paymentRadioWrap}>
                    <View style={[styles.paymentRadioOuter, selected ? styles.paymentRadioOuterSelected : null]}>
                      {selected ? <View style={styles.paymentRadioInner} /> : null}
                    </View>
                  </View>

                  <View style={styles.paymentCopyWrap}>
                    <Text allowFontScaling={false} style={styles.paymentTitle}>{option.title}</Text>
                    <Text allowFontScaling={false} style={styles.paymentSubtitle}>{option.subtitle}</Text>
                    {option.caption ? <Text allowFontScaling={false} style={styles.paymentCaption}>{option.caption}</Text> : null}
                  </View>

                  <Feather color="#6B7280" name={option.icon} size={18} />
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>Promo Code</Text>

          <PromoCodeField
            onApply={applyPromo}
            onChangeText={setPromoCodeInput}
            placeholder="Enter code (try KHABAR20)"
            value={promoCodeInput}
          />

          <View style={styles.securityRow}>
            <Feather color="#2F7A58" name="lock" size={14} />
            <Text allowFontScaling={false} style={styles.securityText}>Payments secured with 256-bit encryption</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>Billing Summary</Text>
          <Text allowFontScaling={false} style={styles.billingHeader}>{`Pay Tk ${total} via ${paymentTitle}`}</Text>

          <View style={styles.billLinesWrap}>
            {items.map((item) => {
              const lineQty = item.quantity * item.monthMultiplier;
              const lineTotal = item.unitPrice * lineQty;

              return (
                <View key={`${item.dishKey}-${item.dayLabel}-${item.planType ?? "today"}`} style={styles.billRow}>
                  <Text allowFontScaling={false} style={styles.billLabel}>{`${item.dishName} × ${lineQty}`}</Text>
                  <Text allowFontScaling={false} style={styles.billValue}>{`Tk ${lineTotal}`}</Text>
                </View>
              );
            })}

            <View style={styles.billRow}>
              <Text allowFontScaling={false} style={styles.billLabel}>Delivery</Text>
              <Text allowFontScaling={false} style={styles.billValueGreen}>Free</Text>
            </View>

            <View style={styles.billRow}>
              <Text allowFontScaling={false} style={styles.billLabel}>Platform fee</Text>
              <Text allowFontScaling={false} style={styles.billValue}>{`Tk ${platformFee}`}</Text>
            </View>

            {discountAmount > 0 ? (
              <View style={styles.billRow}>
                <Text allowFontScaling={false} style={styles.billLabel}>Promo discount</Text>
                <Text allowFontScaling={false} style={styles.billValueGreen}>{`- Tk ${discountAmount}`}</Text>
              </View>
            ) : null}

            <View style={styles.divider} />

            <View style={styles.billRow}>
              <Text allowFontScaling={false} style={styles.billTotalLabel}>Total</Text>
              <Text allowFontScaling={false} style={styles.billTotalValue}>{`Tk ${total}`}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomWrap}>
        <Button
          containerStyle={styles.payActionButton}
          disabled={items.length === 0}
          fullWidth
          onPress={placeOrder}
          textStyle={styles.payActionButtonText}
          title={`Pay Tk ${total}`}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#EEF0F3",
    padding: 0,
  },
  scrollContent: {
    gap: 12,
    paddingBottom: 110,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
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
  sectionCard: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  sectionHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 20,
  },
  sectionActionButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  sectionActionText: {
    color: "#2F7A58",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 16,
  },
  addressCardsWrap: {
    gap: 8,
  },
  addressCard: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
    padding: 10,
  },
  addressCardSelected: {
    backgroundColor: "#F2F8F5",
    borderColor: "#2F7A58",
  },
  addressTopRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  addressTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  defaultChip: {
    backgroundColor: "#E8F4EC",
    borderRadius: 999,
    color: "#2F7A58",
    fontSize: 10,
    fontWeight: "800",
    lineHeight: 12,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  addressLine: {
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  addAddressButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  addAddressText: {
    color: "#2F7A58",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 16,
  },
  paymentOptionsWrap: {
    gap: 8,
  },
  paymentOptionCard: {
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 72,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  paymentOptionCardSelected: {
    backgroundColor: "#F2F8F5",
    borderColor: "#2F7A58",
  },
  paymentRadioWrap: {
    width: 24,
    alignItems: "center",
  },
  paymentRadioOuter: {
    alignItems: "center",
    borderColor: "#D1D5DB",
    borderRadius: 999,
    borderWidth: 1.5,
    height: 18,
    justifyContent: "center",
    width: 18,
  },
  paymentRadioOuterSelected: {
    borderColor: "#2F7A58",
  },
  paymentRadioInner: {
    backgroundColor: "#2F7A58",
    borderRadius: 999,
    height: 9,
    width: 9,
  },
  paymentCopyWrap: {
    flex: 1,
    gap: 1,
  },
  paymentTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
  },
  paymentSubtitle: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  paymentCaption: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 15,
  },
  securityRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  securityText: {
    color: "#2F7A58",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15,
  },
  billingHeader: {
    color: "#1F2937",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  billLinesWrap: {
    gap: 8,
  },
  billRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  billLabel: {
    color: "#6B7280",
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 17,
  },
  billValue: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
  },
  billValueGreen: {
    color: "#2F7A58",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
  },
  divider: {
    backgroundColor: "#E5E7EB",
    height: 1,
  },
  billTotalLabel: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 19,
  },
  billTotalValue: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 19,
  },
  bottomWrap: {
    backgroundColor: "#F8F9FB",
    borderTopColor: "#E5E7EB",
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingTop: 12,
    position: "absolute",
    right: 0,
  },
  payActionButton: {
    borderRadius: 14,
    minHeight: 52,
  },
  payActionButtonText: {
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.84,
  },
});
