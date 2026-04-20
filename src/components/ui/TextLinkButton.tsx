import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { COLORS } from "../../constants";

type TextLinkButtonProps = Omit<PressableProps, "style"> & {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function TextLinkButton({
  title,
  containerStyle,
  textStyle,
  disabled,
  ...rest
}: TextLinkButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled ? styles.buttonDisabled : null,
        pressed && !disabled ? styles.buttonPressed : null,
        containerStyle,
      ]}
      {...rest}
    >
      <Text style={[styles.text, disabled ? styles.textDisabled : null, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  text: {
    color: COLORS.primarySoft,
    fontSize: 14,
    fontWeight: "600",
  },
  textDisabled: {
    color: COLORS.textMuted,
  },
});
