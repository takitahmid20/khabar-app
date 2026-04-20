import { Pressable, StyleSheet, Text } from "react-native";

import { COLORS } from "../../constants";

type CategoryPillProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export default function CategoryPill({ label, active, onPress }: CategoryPillProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, active ? styles.baseActive : styles.baseInactive, pressed ? styles.pressed : null]}
    >
      <Text allowFontScaling={false} style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 34,
    paddingHorizontal: 14,
  },
  baseActive: {
    backgroundColor: COLORS.primarySoft,
    borderColor: COLORS.primarySoft,
  },
  baseInactive: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  labelActive: {
    color: COLORS.white,
  },
  labelInactive: {
    color: "#4B5563",
  },
});