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

type SelectableChipProps = Omit<PressableProps, "style"> & {
  label: string;
  selected?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function SelectableChip({
  label,
  selected,
  containerStyle,
  textStyle,
  disabled,
  ...rest
}: SelectableChipProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.selected : styles.unselected,
        disabled ? styles.disabled : null,
        pressed && !disabled ? styles.pressed : null,
        containerStyle,
      ]}
      {...rest}
    >
      <Text
        allowFontScaling={false}
        style={[
          styles.label,
          selected ? styles.labelSelected : styles.labelUnselected,
          disabled ? styles.labelDisabled : null,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1.5,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selected: {
    backgroundColor: "#EAF6EF",
    borderColor: COLORS.primarySoft,
  },
  unselected: {
    backgroundColor: "#F4F5F7",
    borderColor: "#D7DBE2",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.9,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  labelSelected: {
    color: COLORS.primarySoft,
  },
  labelUnselected: {
    color: "#374151",
    fontWeight: "500",
  },
  labelDisabled: {
    color: COLORS.textMuted,
  },
});
