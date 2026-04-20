import { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, SPACING } from "../../constants";

type DetailSheetModalProps = {
  visible: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function DetailSheetModal({
  visible,
  title,
  subtitle,
  onClose,
  children,
}: DetailSheetModalProps) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />

        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text allowFontScaling={false} style={styles.titleText}>{title}</Text>
          {subtitle ? <Text allowFontScaling={false} style={styles.subtitleText}>{subtitle}</Text> : null}

          <View style={styles.contentWrap}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(15, 23, 42, 0.22)",
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#F9FAFB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  handle: {
    alignSelf: "center",
    backgroundColor: "#D1D5DB",
    borderRadius: 999,
    height: 4,
    marginBottom: 10,
    width: 44,
  },
  titleText: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  subtitleText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 3,
  },
  contentWrap: {
    marginTop: 12,
  },
});