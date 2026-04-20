import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type CookRecentOrderStatus = "active" | "delivered";

type CookRecentOrderRowProps = {
  title: string;
  datetimeLabel: string;
  amountLabel: string;
  status: CookRecentOrderStatus;
  onPress?: () => void;
};

export default function CookRecentOrderRow({
  title,
  datetimeLabel,
  amountLabel,
  status,
  onPress,
}: CookRecentOrderRowProps) {
  const isActive = status === "active";

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed ? styles.pressed : null]}>
      <View style={styles.leadingIconWrap}>
        <Feather color={COLORS.primarySoft} name="box" size={22} />
      </View>

      <View style={styles.middleWrap}>
        <Text allowFontScaling={false} style={styles.titleText}>{title}</Text>
        <Text allowFontScaling={false} style={styles.datetimeText}>{datetimeLabel}</Text>
      </View>

      <View style={styles.trailingWrap}>
        <Text allowFontScaling={false} style={styles.amountText}>{amountLabel}</Text>

        <View style={[styles.statusPill, isActive ? styles.statusPillActive : styles.statusPillDelivered]}>
          <Text allowFontScaling={false} style={[styles.statusText, isActive ? styles.statusTextActive : styles.statusTextDelivered]}>
            {isActive ? "Active" : "Delivered"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    flexDirection: "row",
    minHeight: 110,
    paddingHorizontal: 14,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12,
  },
  pressed: {
    opacity: 0.9,
  },
  leadingIconWrap: {
    alignItems: "center",
    backgroundColor: "#E8F5EC",
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    marginRight: 12,
    width: 56,
  },
  middleWrap: {
    flex: 1,
    gap: 4,
  },
  titleText: {
    color: "#0F172A",
    fontSize: 18 / 1.2,
    fontWeight: "800",
    lineHeight: 22,
  },
  datetimeText: {
    color: "#9CA3AF",
    fontSize: 16 / 1.2,
    fontWeight: "500",
    lineHeight: 22 / 1.2,
  },
  trailingWrap: {
    alignItems: "flex-end",
    gap: 7,
  },
  amountText: {
    color: COLORS.primarySoft,
    fontSize: 19 / 1.2,
    fontWeight: "800",
    lineHeight: 25,
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusPillActive: {
    backgroundColor: "#FEF3C7",
  },
  statusPillDelivered: {
    backgroundColor: "#D8F3DC",
  },
  statusText: {
    fontSize: 15 / 1.2,
    fontWeight: "700",
    lineHeight: 20 / 1.2,
  },
  statusTextActive: {
    color: "#9A4C16",
  },
  statusTextDelivered: {
    color: COLORS.primarySoft,
  },
});