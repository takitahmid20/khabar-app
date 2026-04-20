import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type OrderCardTone = "new" | "preparing" | "outForDelivery" | "delivered";

type OrderItem = {
  name: string;
  amountLabel: string;
};

type OrderCardProps = {
  customerName: string;
  code: string;
  paymentLine: string;
  items: OrderItem[];
  locationLabel: string;
  totalLabel: string;
  tone: OrderCardTone;
  note?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryActionPress?: () => void;
  onSecondaryActionPress?: () => void;
  onCallPress?: () => void;
  onMessagePress?: () => void;
};

const TONE_BORDER_COLOR: Record<OrderCardTone, string> = {
  new: "#EF4444",
  preparing: "#7C3AED",
  outForDelivery: "#F59E0B",
  delivered: COLORS.primarySoft,
};

export default function OrderCard({
  customerName,
  code,
  paymentLine,
  items,
  locationLabel,
  totalLabel,
  tone,
  note,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryActionPress,
  onSecondaryActionPress,
  onCallPress,
  onMessagePress,
}: OrderCardProps) {
  return (
    <View style={[styles.container, { borderTopColor: TONE_BORDER_COLOR[tone] }]}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.nameRow}>
            <Text allowFontScaling={false} style={styles.customerNameText}>{customerName}</Text>
            <Text allowFontScaling={false} style={styles.codeText}>{code}</Text>
          </View>
          <View style={styles.metaRow}>
            <Feather color="#9CA3AF" name="clock" size={10} />
            <Text allowFontScaling={false} style={styles.metaText}>{paymentLine}</Text>
          </View>
        </View>

        <Text allowFontScaling={false} style={styles.totalText}>{totalLabel}</Text>
      </View>

      <View style={styles.itemsWrap}>
        {items.map((item) => (
          <View key={`${item.name}-${item.amountLabel}`} style={styles.itemRow}>
            <Text allowFontScaling={false} style={styles.itemText}>{item.name}</Text>
            <Text allowFontScaling={false} style={styles.itemText}>- {item.amountLabel}</Text>
          </View>
        ))}
      </View>

      {note ? (
        <View style={styles.noteRow}>
          <Feather color="#EF4444" name="alert-circle" size={10} />
          <Text allowFontScaling={false} style={styles.noteText}>Note: "{note}"</Text>
        </View>
      ) : null}

      <View style={styles.metaRow}>
        <Feather color="#EF4444" name="map-pin" size={10} />
        <Text allowFontScaling={false} style={styles.metaText}>{locationLabel}</Text>
      </View>

      <View style={styles.actionsRow}>
        <View style={styles.contactWrap}>
          <Pressable onPress={onCallPress} style={({ pressed }) => [styles.contactButton, pressed ? styles.pressed : null]}>
            <Feather color={COLORS.primarySoft} name="phone" size={13} />
          </Pressable>
          <Pressable onPress={onMessagePress} style={({ pressed }) => [styles.contactButton, styles.messageButton, pressed ? styles.pressed : null]}>
            <Feather color="#7C3AED" name="message-circle" size={13} />
          </Pressable>
        </View>

        {primaryActionLabel ? (
          <View style={styles.ctaWrap}>
            {secondaryActionLabel ? (
              <Pressable
                onPress={onSecondaryActionPress}
                style={({ pressed }) => [styles.secondaryButton, pressed ? styles.pressed : null]}
              >
                <Text allowFontScaling={false} style={styles.secondaryButtonText}>{secondaryActionLabel}</Text>
              </Pressable>
            ) : null}

            <Pressable onPress={onPrimaryActionPress} style={({ pressed }) => [styles.primaryButton, pressed ? styles.pressed : null]}>
              <Text allowFontScaling={false} style={styles.primaryButtonText}>{primaryActionLabel}</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderTopWidth: 3,
    borderWidth: 1,
    gap: 8,
    paddingHorizontal: 11,
    paddingVertical: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
    gap: 4,
    marginRight: 8,
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  customerNameText: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 17,
  },
  codeText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 13,
    textTransform: "lowercase",
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  metaText: {
    color: COLORS.textMuted,
    fontSize: 9.5,
    fontWeight: "500",
    lineHeight: 13,
  },
  totalText: {
    color: COLORS.primarySoft,
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20,
  },
  itemsWrap: {
    borderTopColor: "#F3F4F6",
    borderTopWidth: 1,
    gap: 3,
    paddingTop: 6,
  },
  itemRow: {
    flexDirection: "row",
    gap: 4,
  },
  itemText: {
    color: "#374151",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 13,
  },
  noteRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  noteText: {
    color: "#B91C1C",
    fontSize: 9.5,
    fontStyle: "italic",
    fontWeight: "500",
    lineHeight: 13,
  },
  actionsRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 3,
  },
  contactWrap: {
    flexDirection: "row",
    gap: 6,
  },
  contactButton: {
    alignItems: "center",
    backgroundColor: "#E8F5EC",
    borderRadius: 7,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  messageButton: {
    backgroundColor: "#F2EDFF",
  },
  ctaWrap: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: "#FFF7F7",
    borderColor: "#FCA5A5",
    borderRadius: 9,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 32,
    paddingHorizontal: 10,
  },
  secondaryButtonText: {
    color: "#DC2626",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 13,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: COLORS.primarySoft,
    borderRadius: 9,
    flex: 1,
    justifyContent: "center",
    minHeight: 32,
    minWidth: 96,
    paddingHorizontal: 10,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 13,
  },
  pressed: {
    opacity: 0.82,
  },
});