import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { COLORS, SPACING } from "../../constants";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

type ButtonProps = Omit<PressableProps, "style"> & {
  title: string;
  fullWidth?: boolean;
  rightIconName?: FeatherIconName;
  rightIconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Button({
  title,
  fullWidth,
  rightIconName,
  rightIconColor,
  containerStyle,
  textStyle,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        fullWidth ? styles.fullWidth : null,
        disabled ? styles.buttonDisabled : null,
        pressed && !disabled ? styles.buttonPressed : null,
        containerStyle,
      ]}
      {...rest}
    >
      <View style={styles.contentRow}>
        <Text style={[styles.text, disabled ? styles.textDisabled : null, textStyle]}>{title}</Text>
        {rightIconName ? (
          <Feather
            color={rightIconColor ?? (disabled ? COLORS.textMuted : COLORS.white)}
            name={rightIconName}
            size={18}
            style={styles.rightIcon}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primarySoft,
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  buttonDisabled: {
    backgroundColor: COLORS.border,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  contentRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  textDisabled: {
    color: COLORS.textMuted,
  },
  rightIcon: {
    marginLeft: SPACING.xs,
  },
});
