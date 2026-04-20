import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";

import { COLORS } from "../../constants";

type DashboardSearchBarProps = {
  placeholder: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function DashboardSearchBar({
  placeholder,
  onPress,
  containerStyle,
}: DashboardSearchBarProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed ? styles.pressed : null, containerStyle]}
    >
      <Feather color={COLORS.textMuted} name="search" size={16} />
      <Text allowFontScaling={false} style={styles.placeholder}>{placeholder}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 14,
  },
  pressed: {
    opacity: 0.85,
  },
  placeholder: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
});