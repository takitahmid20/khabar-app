import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type IncomingOrderCardProps = {
  customerName: string;
  orderSummary: string;
  locationLabel: string;
  amountLabel: string;
  timeLabel: string;
  onAcceptPress?: () => void;
  onRejectPress?: () => void;
};

export default function IncomingOrderCard({
  customerName,
  orderSummary,
  locationLabel,
  amountLabel,
  timeLabel,
  onAcceptPress,
  onRejectPress,
}: IncomingOrderCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.leftWrap}>
          <Text allowFontScaling={false} style={styles.customerText}>{customerName}</Text>
          <Text allowFontScaling={false} style={styles.summaryText}>{orderSummary}</Text>
          <Text allowFontScaling={false} style={styles.locationText}>{locationLabel}</Text>
        </View>

        <View style={styles.rightWrap}>
          <Text allowFontScaling={false} style={styles.amountText}>{amountLabel}</Text>
          <Text allowFontScaling={false} style={styles.timeText}>{timeLabel}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <Pressable onPress={onRejectPress} style={({ pressed }) => [styles.rejectButton, pressed ? styles.pressed : null]}>
          <Text allowFontScaling={false} style={styles.rejectText}>Reject</Text>
        </Pressable>

        <Pressable onPress={onAcceptPress} style={({ pressed }) => [styles.acceptButton, pressed ? styles.pressed : null]}>
          <Text allowFontScaling={false} style={styles.acceptText}>Accept Order</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderLeftColor: COLORS.primarySoft,
    borderRadius: 18,
    borderWidth: 1,
    borderLeftWidth: 5,
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftWrap: {
    flex: 1,
    gap: 2,
    marginRight: 8,
  },
  rightWrap: {
    alignItems: "flex-end",
    gap: 3,
  },
  customerText: {
    color: "#0F172A",
    fontSize: 35 / 2,
    fontWeight: "800",
    lineHeight: 22,
  },
  summaryText: {
    color: "#6B7280",
    fontSize: 16 / 1.15,
    fontWeight: "500",
    lineHeight: 22 / 1.15,
  },
  locationText: {
    color: "#9CA3AF",
    fontSize: 15 / 1.15,
    fontWeight: "500",
    lineHeight: 23 / 1.15,
  },
  amountText: {
    color: COLORS.primarySoft,
    fontSize: 19 / 1.15,
    fontWeight: "800",
    lineHeight: 31 / 1.15,
  },
  timeText: {
    color: "#9CA3AF",
    fontSize: 15 / 1.15,
    fontWeight: "500",
    lineHeight: 23 / 1.15,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  rejectButton: {
    alignItems: "center",
    backgroundColor: "#FFF7F7",
    borderColor: "#F5C2C7",
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 58,
  },
  rejectText: {
    color: "#EF4444",
    fontSize: 20 / 1.2,
    fontWeight: "700",
    lineHeight: 22,
  },
  acceptButton: {
    alignItems: "center",
    backgroundColor: COLORS.primarySoft,
    borderRadius: 18,
    flex: 1,
    justifyContent: "center",
    minHeight: 58,
  },
  acceptText: {
    color: COLORS.white,
    fontSize: 20 / 1.2,
    fontWeight: "700",
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.85,
  },
});