import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

type QuickActionCardProps = {
  iconName: FeatherIconName;
  iconTone: "green" | "blue";
  title: string;
  subtitle: string;
  onPress?: () => void;
};

const ICON_TONES: Record<QuickActionCardProps["iconTone"], { background: string; color: string }> = {
  green: {
    background: "#E8F5EC",
    color: COLORS.primarySoft,
  },
  blue: {
    background: "#E8ECF9",
    color: "#4964A8",
  },
};

export default function QuickActionCard({
  iconName,
  iconTone,
  title,
  subtitle,
  onPress,
}: QuickActionCardProps) {
  const palette = ICON_TONES[iconTone];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed ? styles.pressed : null]}>
      <View style={[styles.iconWrap, { backgroundColor: palette.background }]}>
        <Feather color={palette.color} name={iconName} size={20} />
      </View>

      <View style={styles.textWrap}>
        <Text allowFontScaling={false} style={styles.titleText}>{title}</Text>
        <Text allowFontScaling={false} style={styles.subtitleText}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    flex: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 112,
    paddingHorizontal: 14,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12,
  },
  pressed: {
    opacity: 0.85,
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 16,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  textWrap: {
    flex: 1,
    gap: 3,
  },
  titleText: {
    color: "#0F172A",
    fontSize: 18 / 1.2,
    fontWeight: "800",
    lineHeight: 23,
  },
  subtitleText: {
    color: "#9CA3AF",
    fontSize: 16 / 1.2,
    fontWeight: "500",
    lineHeight: 22 / 1.2,
  },
});