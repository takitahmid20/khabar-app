import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, SPACING } from "../../constants";

type CookRejectReasonSheetProps = {
  visible: boolean;
  reasons: string[];
  onClose: () => void;
  onSelectReason: (reason: string) => void;
};

export default function CookRejectReasonSheet({
  visible,
  reasons,
  onClose,
  onSelectReason,
}: CookRejectReasonSheetProps) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />

        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text allowFontScaling={false} style={styles.titleText}>Rejection reason</Text>

          <View style={styles.listWrap}>
            {reasons.map((reason, index) => (
              <Pressable
                key={reason}
                onPress={() => onSelectReason(reason)}
                style={({ pressed }) => [
                  styles.reasonButton,
                  index < reasons.length - 1 ? styles.reasonButtonBorder : null,
                  pressed ? styles.reasonPressed : null,
                ]}
              >
                <Text allowFontScaling={false} style={styles.reasonText}>{reason}</Text>
              </Pressable>
            ))}
          </View>
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
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
    marginBottom: 8,
  },
  listWrap: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  reasonButton: {
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: SPACING.md,
  },
  reasonButtonBorder: {
    borderBottomColor: "#F3F4F6",
    borderBottomWidth: 1,
  },
  reasonPressed: {
    backgroundColor: "#F3F4F6",
  },
  reasonText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
});