import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

type StatCardProps = {
  iconName: FeatherIconName;
  iconTone: "green" | "yellow" | "purple";
  title: string;
  value: string;
  suffix?: string;
  subtitle: string;
  subtitleTone?: "normal" | "positive";
};

const ICON_TONES: Record<StatCardProps["iconTone"], { background: string; color: string }> = {
  green: {
    background: "#E8F5EC",
    color: COLORS.primarySoft,
  },
  yellow: {
    background: "#FEF3C7",
    color: "#C27803",
  },
  purple: {
    background: "#EFEAFE",
    color: "#7C3AED",
  },
};

export default function StatCard({
  iconName,
  iconTone,
  title,
  value,
  suffix,
  subtitle,
  subtitleTone = "normal",
}: StatCardProps) {
  const palette = ICON_TONES[iconTone];

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={[styles.iconWrap, { backgroundColor: palette.background }]}>
          <Feather color={palette.color} name={iconName} size={16} />
        </View>
        <Text allowFontScaling={false} style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.valueRow}>
        <Text allowFontScaling={false} style={styles.valueText}>{value}</Text>
        {suffix ? <Text allowFontScaling={false} style={styles.suffixText}>{suffix}</Text> : null}
      </View>

      <Text
        allowFontScaling={false}
        style={[styles.subtitleText, subtitleTone === "positive" ? styles.subtitlePositive : null]}
      >
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    gap: 10,
    minHeight: 164,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 14,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 999,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  titleText: {
    color: "#9CA3AF",
    fontSize: 14 / 1.15,
    fontWeight: "500",
    lineHeight: 17,
  },
  valueRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 5,
    marginTop: 2,
  },
  valueText: {
    color: "#0F172A",
    fontSize: 26 / 1.15,
    fontWeight: "800",
    lineHeight: 33,
  },
  suffixText: {
    color: "#0F172A",
    fontSize: 18 / 1.15,
    fontWeight: "700",
    lineHeight: 28,
    marginBottom: 2,
  },
  subtitleText: {
    color: "#9CA3AF",
    fontSize: 14 / 1.15,
    fontWeight: "500",
    lineHeight: 18,
  },
  subtitlePositive: {
    color: "#4E8C74",
  },
});