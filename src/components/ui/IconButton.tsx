import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { COLORS } from "../../constants";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

type IconButtonProps = Omit<PressableProps, "style"> & {
  iconName: FeatherIconName;
  iconSize?: number;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function IconButton({
  iconName,
  iconSize = 20,
  iconColor = COLORS.black,
  containerStyle,
  disabled,
  ...rest
}: IconButtonProps) {
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
      <Feather color={disabled ? COLORS.textMuted : iconColor} name={iconName} size={iconSize} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 999,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
