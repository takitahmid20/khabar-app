import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type MenuDayChipProps = {
  shortLabel: string;
  count: number;
  active?: boolean;
  onPress?: () => void;
};

export default function MenuDayChip({
  shortLabel,
  count,
  active,
  onPress,
}: MenuDayChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        active ? styles.baseActive : styles.baseInactive,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={styles.contentWrap}>
        <Text allowFontScaling={false} style={[styles.labelText, active ? styles.labelTextActive : null]}>
          {shortLabel}
        </Text>
        <Text allowFontScaling={false} style={[styles.countText, active ? styles.countTextActive : null]}>
          {count}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    minHeight: 50,
    minWidth: 46,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  baseActive: {
    backgroundColor: COLORS.primarySoft,
  },
  baseInactive: {
    backgroundColor: "#ECEFF3",
  },
  pressed: {
    opacity: 0.82,
  },
  contentWrap: {
    alignItems: "center",
    gap: 4,
    justifyContent: "center",
  },
  labelText: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 13,
  },
  labelTextActive: {
    color: COLORS.white,
  },
  countText: {
    color: "#111827",
    fontSize: 23 / 1.4,
    fontWeight: "800",
    lineHeight: 17,
  },
  countTextActive: {
    color: COLORS.white,
  },
});