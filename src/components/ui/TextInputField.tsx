import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import { COLORS, RADIUS, SPACING } from "../../constants";

type TextInputFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function TextInputField({
  label,
  error,
  style,
  ...rest
}: TextInputFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        placeholderTextColor={COLORS.gray}
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
    borderColor: COLORS.gray,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    color: COLORS.black,
    fontSize: 16,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  errorText: {
    color: "#D13438",
    fontSize: 12,
    fontWeight: "500",
  },
});
