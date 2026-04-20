import type { ReactNode } from "react";
import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { COLORS } from "../../constants";

type OptionCardButtonProps = Omit<PressableProps, "style"> & {
  title: string;
  description: string;
  icon: ReactNode;
  variant: "light" | "dark";
  compact?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function OptionCardButton({
  title,
  description,
  icon,
  variant,
  compact,
  containerStyle,
  ...rest
}: OptionCardButtonProps) {
  const isLight = variant === "light";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        isLight ? styles.light : styles.dark,
        compact ? (isLight ? styles.lightCompact : styles.darkCompact) : null,
        pressed ? styles.pressed : null,
        containerStyle,
      ]}
      {...rest}
    >
      <View style={[styles.iconWrap, isLight ? styles.iconWrapLight : styles.iconWrapDark]}>{icon}</View>

      <View style={styles.content}>
        <Text style={[styles.title, isLight ? styles.titleLight : styles.titleDark, compact ? styles.titleCompact : null]}>
          {title}
        </Text>
        <Text
          style={[
            styles.description,
            isLight ? styles.descriptionLight : styles.descriptionDark,
            compact ? styles.descriptionCompact : null,
          ]}
        >
          {description}
        </Text>
      </View>

      <Feather color={isLight ? COLORS.textMuted : "#42B883"} name="arrow-right" size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: 16,
    flexDirection: "row",
    gap: 15.986,
    justifyContent: "center",
    width: "100%",
  },
  light: {
    backgroundColor: COLORS.white,
    borderColor: "transparent",
    borderWidth: 1.048,
    height: 105.987,
    paddingHorizontal: 21.047,
    shadowColor: "#000000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  dark: {
    backgroundColor: COLORS.primary,
    height: 122.088,
    marginTop: 16,
    paddingHorizontal: 20,
    shadowColor: COLORS.primary,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  lightCompact: {
    height: 94,
    paddingHorizontal: 16,
  },
  darkCompact: {
    height: 104,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  pressed: {
    opacity: 0.92,
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 16,
    height: 55.999,
    justifyContent: "center",
    width: 55.999,
  },
  iconWrapLight: {
    backgroundColor: "#F0FFF4",
  },
  iconWrapDark: {
    backgroundColor: COLORS.primarySoft,
  },
  content: {
    flex: 1,
    minWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 25.5,
  },
  titleLight: {
    color: "#111827",
  },
  titleDark: {
    color: COLORS.white,
    fontSize: 17,
  },
  titleCompact: {
    fontSize: 16,
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18.2,
  },
  descriptionLight: {
    color: COLORS.textSecondary,
  },
  descriptionDark: {
    color: COLORS.primaryLight,
    lineHeight: 18,
  },
  descriptionCompact: {
    fontSize: 12,
    lineHeight: 16,
  },
});
