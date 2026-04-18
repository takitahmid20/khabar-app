import { useForm } from "react-hook-form";
import { z } from "zod";

import type { LoginFormValues } from "../../types";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UseLoginFormParams = {
  onValidSubmit: (values: LoginFormValues) => void;
};

export const useLoginForm = ({ onValidSubmit }: UseLoginFormParams) => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = form.handleSubmit((values) => {
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (key === "email" || key === "password") {
          form.setError(key, { message: issue.message });
        }
      });
      return;
    }

    onValidSubmit(result.data);
  });

  return {
    ...form,
    onSubmit,
  };
};
