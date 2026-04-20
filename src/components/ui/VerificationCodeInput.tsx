import { useMemo, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { COLORS } from "../../constants";

type VerificationCodeInputProps = {
  value: string;
  onChange: (nextValue: string) => void;
  length?: number;
  disabled?: boolean;
  onComplete?: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  cellStyle?: StyleProp<ViewStyle>;
  cellTextStyle?: StyleProp<TextStyle>;
};

export default function VerificationCodeInput({
  value,
  onChange,
  length = 6,
  disabled,
  onComplete,
  containerStyle,
  cellStyle,
  cellTextStyle,
}: VerificationCodeInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const cells = useMemo(() => Array.from({ length }), [length]);

  const handleChangeText = (text: string) => {
    const sanitized = text.replace(/[^\d]/g, "").slice(0, length);
    onChange(sanitized);

    if (sanitized.length === length) {
      onComplete?.(sanitized);
    }
  };

  const handlePress = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  return (
    <Pressable
      accessibilityLabel="Verification code input"
      disabled={disabled}
      onPress={handlePress}
      style={[styles.container, containerStyle, disabled ? styles.containerDisabled : null]}
    >
      <TextInput
        autoComplete="one-time-code"
        autoCorrect={false}
        caretHidden
        contextMenuHidden
        editable={!disabled}
        keyboardType="number-pad"
        maxLength={length}
        onBlur={() => setIsFocused(false)}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        ref={inputRef}
        style={styles.hiddenInput}
        textContentType="oneTimeCode"
        value={value}
      />

      <View style={styles.cellsRow}>
        {cells.map((_, index) => {
          const char = value[index] ?? "";
          const isActiveCell = isFocused && (index === value.length || (value.length === length && index === length - 1));

          return (
            <View
              key={`verification-cell-${index}`}
              style={[
                styles.cell,
                char ? styles.cellFilled : null,
                isActiveCell ? styles.cellActive : null,
                cellStyle,
              ]}
            >
              <Text style={[styles.cellText, cellTextStyle]}>{char}</Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
  containerDisabled: {
    opacity: 0.5,
  },
  hiddenInput: {
    height: 0,
    opacity: 0,
    position: "absolute",
    width: 0,
  },
  cellsRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  cell: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    minHeight: 48,
    justifyContent: "center",
  },
  cellFilled: {
    backgroundColor: "#F8FFFA",
    borderColor: COLORS.primarySoft,
  },
  cellActive: {
    borderWidth: 2,
  },
  cellText: {
    color: "#111827",
    fontSize: 15.5,
    fontWeight: "700",
    lineHeight: 22,
  },
});