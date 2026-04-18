import { Alert, StyleSheet, View } from "react-native";
import { Controller } from "react-hook-form";

import { Button, TextInputField } from "../../components/ui";
import { SPACING } from "../../constants";
import type { LoginFormValues } from "../../types";
import { useAuthStore } from "../../store/useAuthStore";
import { useLoginForm } from "./useLoginForm";

type LoginFormProps = {
  onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const setUser = useAuthStore((state) => state.setUser);

  const { control, onSubmit } = useLoginForm({
    onValidSubmit: (values: LoginFormValues) => {
      setUser({
        id: "local-user",
        name: "Khabar User",
        email: values.email,
      });
      Alert.alert("Success", "Login validated with React Hook Form + Zod");
      onSuccess?.();
    },
  });

  return (
    <View style={styles.form}>
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

      <Button onPress={onSubmit} title="Sign In" />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: SPACING.md,
  },
});
