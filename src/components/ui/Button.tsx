import { Pressable, StyleSheet, Text, type PressableProps } from "react-native";

import { COLORS, RADIUS, SPACING } from "../../constants";

type ButtonProps = PressableProps & {
  title: string;
};

export default function Button({ title, style, ...rest }: ButtonProps) {
  return (
    <Pressable style={[styles.button, style]} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
