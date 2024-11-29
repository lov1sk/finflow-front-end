"use client";
import { forgotPassword } from "@/http/auth/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const recoverPasswordFormSchema = z.object({
  email: z.string().email(),
});

type RecoverPasswordFormSchema = z.infer<typeof recoverPasswordFormSchema>;
export function RecoverPasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const formMethods = useForm<RecoverPasswordFormSchema>({
    resolver: zodResolver(recoverPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  const handleSubmitPasswordRecover = async (
    payload: RecoverPasswordFormSchema
  ) => {
    const response = await forgotPassword({
      email: payload.email,
    });

    if (response.success) {
      setErrorMessage(undefined);
      return setSuccessMessage(response.data);
    }

    setSuccessMessage(undefined);
    return setErrorMessage(response.errorMessage);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitPasswordRecover)}
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <FormControl fullWidth>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          E-mail
        </Typography>
        <TextField
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="Digite seu email"
        />
      </FormControl>
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
