import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants";

type SectionHeaderRowProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  rightContent?: ReactNode;
};

export default function SectionHeaderRow({
  title,
  actionLabel,
  onActionPress,
  rightContent,
}: SectionHeaderRowProps) {
  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>{title}</Text>

      {rightContent ? (
        <View>{rightContent}</View>
      ) : actionLabel ? (
        <Pressable onPress={onActionPress} style={({ pressed }) => [pressed ? styles.pressed : null]}>
          <Text allowFontScaling={false} style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#111827",
    fontSize: 22 / 2,
    fontWeight: "800",
    lineHeight: 16,
  },
  actionText: {
    color: COLORS.primarySoft,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.75,
  },
});