import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

export type OrderTabKey = "new" | "preparing" | "outForDelivery" | "delivered";

type OrderStatusTabsProps = {
  activeKey: OrderTabKey;
  counts: Record<OrderTabKey, number>;
  onTabPress: (tabKey: OrderTabKey) => void;
};

const TAB_META: Array<{ key: OrderTabKey; label: string; color: string }> = [
  { key: "new", label: "New", color: "#EF4444" },
  { key: "preparing", label: "Preparing", color: "#7C3AED" },
  { key: "outForDelivery", label: "Out for Delivery", color: "#F59E0B" },
  { key: "delivered", label: "Delivered", color: COLORS.primarySoft },
];

export default function OrderStatusTabs({ activeKey, counts, onTabPress }: OrderStatusTabsProps) {
  return (
    <View style={styles.row}>
      {TAB_META.map((tab) => {
        const isActive = tab.key === activeKey;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={({ pressed }) => [styles.tabButton, pressed ? styles.tabPressed : null]}
          >
            <View style={styles.labelRow}>
              <Text
                allowFontScaling={false}
                style={[styles.tabLabel, isActive ? { color: tab.color, fontWeight: "700" } : null]}
              >
                {tab.label}
              </Text>
              <View style={styles.countBadge}>
                <Text allowFontScaling={false} style={[styles.countText, isActive ? { color: tab.color } : null]}>
                  {counts[tab.key]}
                </Text>
              </View>
            </View>
            <View style={[styles.indicator, isActive ? { backgroundColor: tab.color } : null]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    gap: 8,
    minWidth: 0,
  },
  tabPressed: {
    opacity: 0.8,
  },
  labelRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    minHeight: 22,
  },
  tabLabel: {
    color: COLORS.textMuted,
    fontSize: 10.5,
    fontWeight: "500",
    lineHeight: 13,
  },
  countBadge: {
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    height: 15,
    justifyContent: "center",
    minWidth: 15,
    paddingHorizontal: 4,
  },
  countText: {
    color: COLORS.textMuted,
    fontSize: 9.5,
    fontWeight: "700",
    lineHeight: 12,
  },
  indicator: {
    backgroundColor: "#D1D5DB",
    borderRadius: 999,
    height: 2,
    width: "100%",
  },
});