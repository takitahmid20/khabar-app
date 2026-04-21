import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type SettingTone = "amber" | "green" | "purple" | "mint" | "blue" | "slate" | "rose";

type ProfileSettingRowProps = {
  title: string;
  subtitle: string;
  iconName: React.ComponentProps<typeof Feather>["name"];
  tone?: SettingTone;
  badgeLabel?: string;
  onPress?: () => void;
  showDivider?: boolean;
};

const TONE_MAP: Record<SettingTone, { bg: string; icon: string }> = {
  amber: { bg: "#FFF5DB", icon: "#D97706" },
  green: { bg: "#EAF6EF", icon: "#2D6A4F" },
  purple: { bg: "#F3EBFF", icon: "#7C3AED" },
  mint: { bg: "#E7FAF2", icon: "#0F9D73" },
  blue: { bg: "#E9F2FF", icon: "#2563EB" },
  slate: { bg: "#F3F4F6", icon: "#6B7280" },
  rose: { bg: "#FDECEC", icon: "#EF4444" },
};

export default function ProfileSettingRow({
  title,
  subtitle,
  iconName,
  tone = "slate",
  badgeLabel,
  onPress,
  showDivider,
}: ProfileSettingRowProps) {
  const palette = TONE_MAP[tone];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed ? styles.pressed : null]}>
      <View style={styles.leftWrap}>
        <View style={[styles.iconWrap, { backgroundColor: palette.bg }]}>
          <Feather color={palette.icon} name={iconName} size={13} />
        </View>

        <View style={styles.textWrap}>
          <View style={styles.titleRow}>
            <Text allowFontScaling={false} style={styles.titleText}>{title}</Text>
            {badgeLabel ? (
              <View style={styles.badgePill}>
                <Text allowFontScaling={false} style={styles.badgeText}>{badgeLabel}</Text>
              </View>
            ) : null}
          </View>
          <Text allowFontScaling={false} style={styles.subtitleText}>{subtitle}</Text>
        </View>
      </View>

      <Feather color="#D1D5DB" name="chevron-right" size={16} />

      {showDivider ? <View style={styles.divider} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "center",
    minHeight: 56,
    position: "relative",
  },
  pressed: {
    opacity: 0.85,
  },
  leftWrap: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 18,
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 999,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    color: "#1F2937",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
  },
  badgePill: {
    backgroundColor: "#FEF3C7",
    borderRadius: 999,
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#92400E",
    fontSize: 8,
    fontWeight: "800",
    lineHeight: 10,
  },
  subtitleText: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 13,
    marginTop: 1,
  },
  divider: {
    backgroundColor: "#F3F4F6",
    bottom: 0,
    height: 1,
    left: 34,
    position: "absolute",
    right: 0,
  },
});
