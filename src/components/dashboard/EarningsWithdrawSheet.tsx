import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, SPACING } from "../../constants";
import { Button, SelectableChip, TextInputField } from "../ui";

export type WithdrawPresetValue = number | "ALL";

type EarningsWithdrawSheetProps = {
  visible: boolean;
  amount: string;
  availableLabel: string;
  destinationLabel: string;
  presets: WithdrawPresetValue[];
  isProcessing?: boolean;
  submitDisabled?: boolean;
  onClose: () => void;
  onAmountChange: (nextValue: string) => void;
  onPresetPress: (preset: WithdrawPresetValue) => void;
  onSubmit: () => void;
};

export default function EarningsWithdrawSheet({
  visible,
  amount,
  availableLabel,
  destinationLabel,
  presets,
  isProcessing,
  submitDisabled,
  onClose,
  onAmountChange,
  onPresetPress,
  onSubmit,
}: EarningsWithdrawSheetProps) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.headingRow}>
            <Text allowFontScaling={false} style={styles.titleText}>Withdraw Earnings</Text>
            <Pressable onPress={onClose} style={({ pressed }) => [styles.closeButton, pressed ? styles.closePressed : null]}>
              <Feather color="#6B7280" name="x" size={18} />
            </Pressable>
          </View>

          <Text allowFontScaling={false} style={styles.metaText}>{`Available: ${availableLabel} - To ${destinationLabel}`}</Text>

          <TextInputField
            keyboardType="number-pad"
            label="Amount (Tk)"
            onChangeText={onAmountChange}
            placeholder="Enter amount"
            style={styles.amountInput}
            value={amount}
            wrapperStyle={styles.amountInputWrap}
          />

          <View style={styles.presetsRow}>
            {presets.map((preset) => {
              const label = preset === "ALL" ? "All" : `Tk ${preset}`;

              return (
                <SelectableChip
                  containerStyle={styles.presetChip}
                  key={String(preset)}
                  label={label}
                  onPress={() => onPresetPress(preset)}
                  selected={preset !== "ALL" ? amount === String(preset) : false}
                  textStyle={styles.presetChipText}
                />
              );
            })}
          </View>

          <Button
            containerStyle={styles.submitButton}
            disabled={submitDisabled || isProcessing}
            fullWidth
            onPress={onSubmit}
            title={isProcessing ? "Processing..." : "Withdraw to bKash"}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(17, 24, 39, 0.28)",
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
  headingRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    color: "#111827",
    fontSize: 32 / 1.6,
    fontWeight: "800",
    lineHeight: 28,
  },
  closeButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  closePressed: {
    opacity: 0.75,
  },
  metaText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 4,
  },
  amountInputWrap: {
    gap: 4,
    marginTop: 10,
  },
  amountInput: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
    color: "#111827",
    fontSize: 31 / 1.55,
    fontWeight: "700",
    minHeight: 52,
  },
  presetsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  presetChip: {
    borderRadius: 12,
    minHeight: 30,
    minWidth: 74,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  presetChipText: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  submitButton: {
    borderRadius: 12,
    marginTop: 12,
    minHeight: 46,
  },
});
