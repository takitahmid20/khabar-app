import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, SPACING } from "../../constants";

type LogoutConfirmSheetProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  accountLabel?: string;
  subtitle?: string;
};

export default function LogoutConfirmSheet({
  visible,
  onClose,
  onConfirm,
  accountLabel = "Cook",
  subtitle = "You need sign in again to access orders and earnings.",
}: LogoutConfirmSheetProps) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text allowFontScaling={false} style={styles.titleText}>{`Log out of ${accountLabel} Account?`}</Text>
          <Text allowFontScaling={false} style={styles.subtitleText}>{subtitle}</Text>

          <Pressable onPress={onConfirm} style={({ pressed }) => [styles.confirmButton, pressed ? styles.pressed : null]}>
            <Text allowFontScaling={false} style={styles.confirmText}>Yes, Log Out</Text>
          </Pressable>

          <Pressable onPress={onClose} style={({ pressed }) => [styles.cancelButton, pressed ? styles.pressed : null]}>
            <Text allowFontScaling={false} style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(15, 23, 42, 0.24)",
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#F9FAFB",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  handle: {
    alignSelf: "center",
    backgroundColor: "#D1D5DB",
    borderRadius: 999,
    height: 4,
    marginBottom: 12,
    width: 46,
  },
  titleText: {
    color: "#111827",
    fontSize: 30 / 1.6,
    fontWeight: "800",
    lineHeight: 26,
  },
  subtitleText: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    marginTop: 6,
  },
  confirmButton: {
    alignItems: "center",
    backgroundColor: "#EF4444",
    borderRadius: 10,
    justifyContent: "center",
    minHeight: 42,
    marginTop: 14,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  cancelButton: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 42,
    marginTop: 8,
  },
  cancelText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.84,
  },
});
