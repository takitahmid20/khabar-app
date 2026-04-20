import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

import { COLORS } from "../../constants";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

type QuickFilterPillProps = {
  label: string;
  iconName: FeatherIconName;
  onPress?: () => void;
};

export default function QuickFilterPill({ label, iconName, onPress }: QuickFilterPillProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed ? styles.pressed : null]}
    >
      <Feather color={COLORS.primarySoft} name={iconName} size={12} />
      <Text allowFontScaling={false} style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    minHeight: 28,
    paddingHorizontal: 10,
  },
  pressed: {
    opacity: 0.82,
  },
  label: {
    color: "#4B5563",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
  },
});