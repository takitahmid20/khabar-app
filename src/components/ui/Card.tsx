import { StyleSheet, View, type ViewProps } from "react-native";

import { COLORS, RADIUS, SPACING } from "../../constants";

export default function Card({ style, ...rest }: ViewProps) {
  return <View style={[styles.card, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
});
