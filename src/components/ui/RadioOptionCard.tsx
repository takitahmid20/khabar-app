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

import { COLORS } from "../../constants";

type RadioOptionCardProps = Omit<PressableProps, "style"> & {
  label: string;
  selected?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export default function RadioOptionCard({
  label,
  selected,
  containerStyle,
  labelStyle,
  disabled,
  ...rest
}: RadioOptionCardProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.baseSelected : styles.baseUnselected,
        disabled ? styles.disabled : null,
        pressed && !disabled ? styles.pressed : null,
        containerStyle,
      ]}
      {...rest}
    >
      <View style={[styles.radioOuter, selected ? styles.radioOuterSelected : styles.radioOuterUnselected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>

      <Text allowFontScaling={false} style={[styles.label, disabled ? styles.labelDisabled : null, labelStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 22,
    borderWidth: 1.5,
    flexDirection: "row",
    minHeight: 82,
    paddingHorizontal: 20,
  },
  baseSelected: {
    borderColor: COLORS.primarySoft,
  },
  baseUnselected: {
    borderColor: COLORS.border,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.92,
  },
  radioOuter: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1.5,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  radioOuterSelected: {
    borderColor: COLORS.primarySoft,
  },
  radioOuterUnselected: {
    borderColor: "#C6CCD6",
  },
  radioInner: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
    height: 14,
    width: 14,
  },
  label: {
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
    marginLeft: 20,
  },
  labelDisabled: {
    color: COLORS.textMuted,
  },
});
