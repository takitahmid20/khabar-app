import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Controller } from "react-hook-form";

import { Button, SelectableChip, TextInputField } from "../../components/ui";
import { SPACING } from "../../constants";
import type { LoginFormValues } from "../../types";
import { useAuthStore } from "../../store/useAuthStore";
import { useLoginForm } from "./useLoginForm";

type LoginTargetRole = "cook" | "customer";

type LoginFormProps = {
  onSuccess?: (role: LoginTargetRole) => void;
};

const TEST_LOGIN_PRESETS: Record<LoginTargetRole, { email: string; password: string; label: string }> = {
  cook: {
    email: "cook@khabar.test",
    password: "cook123",
    label: "Cook",
  },
  customer: {
    email: "customer@khabar.test",
    password: "customer123",
    label: "Customer",
  },
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const [selectedRole, setSelectedRole] = useState<LoginTargetRole | null>(null);

  const { clearErrors, control, onSubmit, setValue } = useLoginForm({
    onValidSubmit: (values: LoginFormValues) => {
      const normalizedEmail = values.email.trim().toLowerCase();
      const targetRole: LoginTargetRole =
        normalizedEmail === TEST_LOGIN_PRESETS.customer.email
          ? "customer"
          : normalizedEmail === TEST_LOGIN_PRESETS.cook.email
            ? "cook"
            : selectedRole ?? "cook";

      setUser({
        id: `local-${targetRole}`,
        name: targetRole === "cook" ? "Cook Test User" : "Customer Test User",
        email: values.email,
      });
      Alert.alert("Success", `Signed in as ${targetRole === "cook" ? "Cook" : "Customer"}`);
      onSuccess?.(targetRole);
    },
  });

  const applyTestPreset = (role: LoginTargetRole) => {
    const preset = TEST_LOGIN_PRESETS[role];
    setSelectedRole(role);
    setValue("email", preset.email, { shouldDirty: true, shouldTouch: true });
    setValue("password", preset.password, { shouldDirty: true, shouldTouch: true });
    clearErrors();
  };

  return (
    <View style={styles.form}>
      <View style={styles.presetWrap}>
        <Text allowFontScaling={false} style={styles.presetTitle}>Quick Test Login</Text>
        <Text allowFontScaling={false} style={styles.presetSubtitle}>Tap role badge to autofill test credentials.</Text>

        <View style={styles.presetRow}>
          {(Object.keys(TEST_LOGIN_PRESETS) as LoginTargetRole[]).map((role) => (
            <SelectableChip
              containerStyle={styles.presetChip}
              key={role}
              label={TEST_LOGIN_PRESETS[role].label}
              onPress={() => applyTestPreset(role)}
              selected={selectedRole === role}
              textStyle={styles.presetChipText}
            />
          ))}
        </View>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInputField
            keyboardType="email-address"
            label="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="you@example.com"
            value={value}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInputField
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your password"
            secureTextEntry
            value={value}
            error={error?.message}
          />
        )}
      />

      <Button fullWidth onPress={onSubmit} title="Sign In" />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: SPACING.md,
  },
  presetWrap: {
    backgroundColor: "#F3F6FA",
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  presetTitle: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  presetSubtitle: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  presetRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  presetChip: {
    borderRadius: 10,
    flex: 1,
    minHeight: 34,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  presetChipText: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
});
