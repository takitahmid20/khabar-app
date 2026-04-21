import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, SPACING } from "../../constants";

export type CustomerSearchSortOption = {
  key: "recommended" | "rating" | "distance" | "deliveryTime" | "priceLowHigh";
  label: string;
};

type CustomerSearchSortSheetProps = {
  visible: boolean;
  options: CustomerSearchSortOption[];
  selectedKey: CustomerSearchSortOption["key"];
  onClose: () => void;
  onSelect: (sortKey: CustomerSearchSortOption["key"]) => void;
};

export default function CustomerSearchSortSheet({
  visible,
  options,
  selectedKey,
  onClose,
  onSelect,
}: CustomerSearchSortSheetProps) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />

        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text allowFontScaling={false} style={styles.titleText}>Sort by</Text>

          <View style={styles.optionsWrap}>
            {options.map((option, index) => {
              const isSelected = option.key === selectedKey;

              return (
                <Pressable
                  key={option.key}
                  onPress={() => onSelect(option.key)}
                  style={({ pressed }) => [
                    styles.optionButton,
                    index < options.length - 1 ? styles.optionBorder : null,
                    pressed ? styles.optionPressed : null,
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[styles.optionLabel, isSelected ? styles.optionLabelActive : null]}
                  >
                    {option.label}
                  </Text>

                  {isSelected ? (
                    <View style={styles.checkWrap}>
                      <Feather color={COLORS.primarySoft} name="check" size={12} />
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(15, 23, 42, 0.28)",
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
    marginBottom: 12,
    width: 46,
  },
  titleText: {
    color: "#111827",
    fontSize: 29 / 1.6,
    fontWeight: "800",
    lineHeight: 24,
    marginBottom: 10,
  },
  optionsWrap: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  optionButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 58,
    paddingHorizontal: SPACING.md,
  },
  optionBorder: {
    borderBottomColor: "#F3F4F6",
    borderBottomWidth: 1,
  },
  optionPressed: {
    backgroundColor: "#F3F4F6",
  },
  optionLabel: {
    color: "#4B5563",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
  },
  optionLabelActive: {
    color: COLORS.primarySoft,
    fontWeight: "700",
  },
  checkWrap: {
    alignItems: "center",
    borderColor: COLORS.primarySoft,
    borderRadius: 999,
    borderWidth: 2,
    height: 20,
    justifyContent: "center",
    width: 20,
  },
});
