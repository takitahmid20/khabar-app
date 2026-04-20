import {
  StyleSheet,
  Text,
  TextInput,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";

import { COLORS, RADIUS, SPACING } from "../../constants";

type TextInputFieldProps = TextInputProps & {
  label?: string;
  error?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export default function TextInputField({
  label,
  error,
  wrapperStyle,
  labelStyle,
  style,
  ...rest
}: TextInputFieldProps) {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <TextInput
        autoCapitalize="none"
        placeholderTextColor={COLORS.textMuted}
        style={[styles.input, style]}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.xs,
  },
  label: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    color: COLORS.black,
    fontSize: 17,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  errorText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "500",
  },
});
