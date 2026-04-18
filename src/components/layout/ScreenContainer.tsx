import { SafeAreaView, StyleSheet, View, type ViewProps } from "react-native";

import { COLORS, SPACING } from "../../constants";

export default function ScreenContainer({ style, ...rest }: ViewProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]} {...rest} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
});
