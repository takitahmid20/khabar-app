import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";

import { COLORS } from "../../constants";

type SearchSortPillProps = {
  label: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function SearchSortPill({ label, onPress, containerStyle }: SearchSortPillProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed ? styles.pressed : null, containerStyle]}
    >
      <Text allowFontScaling={false} style={styles.label}>{label}</Text>
      <Feather color="#6B7280" name="chevron-down" size={14} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    minHeight: 34,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
});