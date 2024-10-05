"use client";
import { signIn } from "@/http/auth/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Insira um email valido"),
  password: z.string().min(1, "Insira uma senha valida!"),
});
type LoginFormSchema = z.infer<typeof loginFormSchema>;
export function LoginForm() {
  const formMethods = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods;

  const handleLogin = async (payload: LoginFormSchema) =>
    await signIn({ email: payload.email, password: payload.password });
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
      <FormControl fullWidth>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Senha
        </Typography>
        <TextField
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          placeholder="Digite sua senha"
          type="password"
        />
      </FormControl>
      <Button variant="contained" type="submit">
        Entrar
      </Button>
    </form>
  );
}
