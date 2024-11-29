"use client";
import { signIn } from "@/http/auth/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "@/components/password-input";

const loginFormSchema = z.object({
  email: z.string().email("Insira um email valido"),
  password: z.string().min(1, "Insira uma senha valida!"),
});
type LoginFormSchema = z.infer<typeof loginFormSchema>;
export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const formMethods = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = formMethods;

  const handleLogin = async (payload: LoginFormSchema) => {
    const response = await signIn({
      email: payload.email,
      password: payload.password,
    });

    if (response?.error) {
      return setErrorMessage(response.errorMessage ?? "Erro no login");
    }

    return router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
      }}
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
      <PasswordInput
        label="Senha"
        control={control}
        name="password"
        error={errors.password}
        placeholder="Digite sua senha"
      />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Button variant="contained" type="submit" disabled={isSubmitting}>
        Entrar
      </Button>
    </form>
  );
}
