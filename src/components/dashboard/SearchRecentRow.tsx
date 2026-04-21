import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SearchRecentRowProps = {
  label: string;
  onPress?: () => void;
  showBorder?: boolean;
};

export default function SearchRecentRow({ label, onPress, showBorder }: SearchRecentRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        showBorder ? styles.borderBottom : null,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={styles.iconWrap}>
        <Feather color="#9CA3AF" name="search" size={14} />
      </View>

      <Text allowFontScaling={false} style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    minHeight: 42,
    paddingHorizontal: 2,
  },
  borderBottom: {
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
  },
  pressed: {
    opacity: 0.8,
  },
  iconWrap: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  label: {
    color: "#4B5563",
    fontSize: 23 / 1.6,
    fontWeight: "500",
    lineHeight: 18,
  },
});
