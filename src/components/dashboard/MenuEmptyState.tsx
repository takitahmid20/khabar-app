import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type MenuEmptyStateProps = {
  dayLabel: string;
  onAddDishPress?: () => void;
};

export default function MenuEmptyState({ dayLabel, onAddDishPress }: MenuEmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Feather color="#374151" name="search" size={18} />
      </View>

      <Text allowFontScaling={false} style={styles.titleText}>{`No dishes for ${dayLabel}`}</Text>
      <Text allowFontScaling={false} style={styles.messageText}>
        Add meals to let customers order for this day.
      </Text>

      <Pressable onPress={onAddDishPress} style={({ pressed }) => [styles.ctaButton, pressed ? styles.pressed : null]}>
        <Text allowFontScaling={false} style={styles.ctaText}>+ Add first dish</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 360,
    paddingHorizontal: 24,
  },
  iconWrap: {
    alignItems: "center",
    borderColor: "#D1D5DB",
    borderRadius: 999,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    marginBottom: 16,
    width: 34,
  },
  titleText: {
    color: "#374151",
    fontSize: 28 / 1.6,
    fontWeight: "800",
    lineHeight: 22,
    marginBottom: 6,
    textAlign: "center",
  },
  messageText: {
    color: COLORS.textMuted,
    fontSize: 26 / 2,
    fontWeight: "500",
    lineHeight: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  ctaButton: {
    alignItems: "center",
    backgroundColor: COLORS.primarySoft,
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 40,
    minWidth: 114,
    paddingHorizontal: 16,
  },
  ctaText: {
    color: COLORS.white,
    fontSize: 14 / 1.25,
    fontWeight: "700",
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.84,
  },
});