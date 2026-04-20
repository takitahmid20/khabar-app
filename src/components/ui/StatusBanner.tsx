import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { COLORS } from "../../constants";

type BannerTone = "warning" | "success" | "info";
type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

type StatusBannerProps = {
  message: string;
  tone?: BannerTone;
  containerStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
  leadingIconName?: FeatherIconName;
  leadingIconColor?: string;
  leadingIconSize?: number;
};

const TONE_STYLES: Record<BannerTone, { backgroundColor: string; borderColor: string; textColor: string }> = {
  warning: {
    backgroundColor: "#FEF3C7",
    borderColor: "#F8CF5A",
    textColor: "#B45309",
  },
  success: {
    backgroundColor: "#E8F5EC",
    borderColor: "#A7DDBA",
    textColor: COLORS.primarySoft,
  },
  info: {
    backgroundColor: "#EBF3FF",
    borderColor: "#BFDBFE",
    textColor: "#1D4ED8",
  },
};

export default function StatusBanner({
  message,
  tone = "warning",
  containerStyle,
  messageStyle,
  leadingIconName,
  leadingIconColor,
  leadingIconSize = 14,
}: StatusBannerProps) {
  const palette = TONE_STYLES[tone];

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor,
        },
        containerStyle,
      ]}
    >
      {leadingIconName ? (
        <Feather
          color={leadingIconColor ?? palette.textColor}
          name={leadingIconName}
          size={leadingIconSize}
          style={styles.leadingIcon}
        />
      ) : null}
      <Text allowFontScaling={false} style={[styles.message, { color: palette.textColor }, messageStyle]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "flex-start",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  leadingIcon: {
    marginTop: 3,
  },
  message: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
  },
});
