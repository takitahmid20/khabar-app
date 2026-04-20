import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS, SPACING } from "../../constants";
import Button from "./Button";

type FormSheetProps = {
  visible: boolean;
  title: string;
  submitLabel: string;
  submitDisabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
};

export default function FormSheet({
  visible,
  title,
  submitLabel,
  submitDisabled,
  onClose,
  onSubmit,
  children,
}: FormSheetProps) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />

        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text allowFontScaling={false} style={styles.titleText}>{title}</Text>

          <View style={styles.contentWrap}>{children}</View>

          <Button
            containerStyle={styles.submitButton}
            disabled={submitDisabled}
            fullWidth
            onPress={onSubmit}
            title={submitLabel}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(17, 24, 39, 0.24)",
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#F9FAFB",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingBottom: 20,
    paddingHorizontal: SPACING.lg,
    paddingTop: 8,
  },
  handle: {
    alignSelf: "center",
    backgroundColor: "#D1D5DB",
    borderRadius: 999,
    height: 4,
    marginBottom: 12,
    width: 50,
  },
  titleText: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 24,
    marginBottom: 12,
  },
  contentWrap: {
    gap: 10,
  },
  submitButton: {
    borderRadius: 12,
    marginTop: 12,
    minHeight: 42,
  },
});