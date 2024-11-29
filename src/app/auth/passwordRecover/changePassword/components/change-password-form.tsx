"use client";
import { PasswordInput } from "@/components/password-input";
import { resetPassword } from "@/http/auth/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const changePasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Por favor, insira uma senha com minimo 6 caracteres"),

    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const isPasswordSame = data.password === data.confirmPassword;
    if (!isPasswordSame) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "As senhas não coincidem",
        code: "custom",
      });
    }
  });

type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;

interface ChangePasswordFormProps {
  token: string;
  email: string;
}
export function ChangePasswordForm({ token, email }: ChangePasswordFormProps) {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const formMethods = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  const handleChangePassword = async (payload: ChangePasswordFormSchema) => {
    const response = await resetPassword({
      password: payload.password,
      email,
      token,
    });

    if (response.success) {
      setErrorMessage(undefined);
      setSuccessMessage("Sucesso ao recuperar a senha!");

      return router.push("/auth/login");
    }

    setSuccessMessage(undefined);
    return setErrorMessage(response.errorMessage);
  };
  return (
    <form
      onSubmit={handleSubmit(handleChangePassword)}
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <PasswordInput
        label="Senha"
        control={control}
        name="password"
        error={errors.password}
        placeholder="Digite sua senha"
      />
      <PasswordInput
        label="Confirmar Senha"
        control={control}
        name="confirmPassword"
        error={errors.confirmPassword}
        placeholder="Digite a confimação da sua senha"
      />
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={isSubmitting}
      >
        Enviar
      </Button>
    </form>
  );
}
