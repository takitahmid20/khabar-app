import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { COLORS } from "../../constants";

type PromoCodeFieldProps = {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onApply: () => void;
};

export default function PromoCodeField({
  value,
  placeholder,
  onChangeText,
  onApply,
}: PromoCodeFieldProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftWrap}>
        <Feather color="#9CA3AF" name="tag" size={16} />
        <TextInput
          allowFontScaling={false}
          autoCapitalize="characters"
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={value}
        />
      </View>

      <Pressable onPress={onApply} style={({ pressed }) => [styles.applyWrap, pressed ? styles.pressed : null]}>
        <Text allowFontScaling={false} style={styles.applyText}>Apply</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: "#D9DDE4",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 56,
    paddingHorizontal: 12,
  },
  leftWrap: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  input: {
    color: "#111827",
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    minHeight: 40,
    padding: 0,
  },
  applyWrap: {
    minHeight: 30,
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  applyText: {
    color: "#2F7A58",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.84,
  },
});
