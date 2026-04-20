import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type PromoBannerCardProps = {
  title: string;
  subtitle: string;
  actionLabel: string;
  onActionPress?: () => void;
};

export default function PromoBannerCard({
  title,
  subtitle,
  actionLabel,
  onActionPress,
}: PromoBannerCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.decorationCircleLarge} />
      <View style={styles.decorationCircleSmall} />

      <Text allowFontScaling={false} style={styles.title}>{title}</Text>
      <Text allowFontScaling={false} style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.footerRow}>
        <Pressable onPress={onActionPress} style={({ pressed }) => [styles.actionButton, pressed ? styles.actionPressed : null]}>
          <Text allowFontScaling={false} style={styles.actionLabel}>{actionLabel}</Text>
        </Pressable>

        <View style={styles.indicatorsRow}>
          <View style={[styles.indicator, styles.indicatorActive]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: 14,
    overflow: "hidden",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  decorationCircleLarge: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    height: 92,
    position: "absolute",
    right: -18,
    top: 8,
    width: 92,
  },
  decorationCircleSmall: {
    backgroundColor: "rgba(255,255,255,0.11)",
    borderRadius: 999,
    height: 54,
    position: "absolute",
    right: 24,
    top: -12,
    width: 54,
  },
  title: {
    color: COLORS.white,
    fontSize: 28 / 2,
    fontWeight: "800",
    lineHeight: 20,
  },
  subtitle: {
    color: "#BAE6CD",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 15,
    marginTop: 4,
  },
  footerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 28,
    paddingHorizontal: 12,
  },
  actionPressed: {
    opacity: 0.8,
  },
  actionLabel: {
    color: COLORS.primarySoft,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
  indicatorsRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  indicator: {
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 999,
    height: 6,
    width: 6,
  },
  indicatorActive: {
    backgroundColor: COLORS.white,
    width: 14,
  },
});