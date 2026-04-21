import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type EarningsStatSummaryCardProps = {
  label: string;
  valueLabel: string;
  deltaLabel: string;
  deltaPositive?: boolean;
};

export default function EarningsStatSummaryCard({
  label,
  valueLabel,
  deltaLabel,
  deltaPositive,
}: EarningsStatSummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text allowFontScaling={false} style={styles.labelText}>{label}</Text>
      <Text allowFontScaling={false} style={styles.valueText}>{valueLabel}</Text>
      <Text allowFontScaling={false} style={[styles.deltaText, deltaPositive ? styles.deltaPositive : null]}>{deltaLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    flex: 1,
    gap: 2,
    minHeight: 86,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  labelText: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 13,
    textTransform: "uppercase",
  },
  valueText: {
    color: "#111827",
    fontSize: 23 / 1.35,
    fontWeight: "800",
    lineHeight: 20,
  },
  deltaText: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
  },
  deltaPositive: {
    color: COLORS.primarySoft,
  },
});
