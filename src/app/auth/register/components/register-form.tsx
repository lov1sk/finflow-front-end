"use client";
import { signUp } from "@/http/auth/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  Alert,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { registerGenders } from "@/app/utils/get-available-genders";
import { useState } from "react";
import { useRouter } from "next/navigation";
const registerFormSchema = z
  .object({
    fullName: z.string().min(1, "Por Favor, insira seu nome completo"),
    gender: z.string().min(1, "Insira um genero valido"),
    age: z.coerce
      .number()
      .refine((value) => value > 0, "Insira uma idade valida")
      .refine((value) => value >= 18, "Você precisa pelo menos ter 18 anos."),
    email: z.string().email("Insira um email valido"),
    password: z.string().min(6, "Insira uma senha com pelo menos 6 caracteres"),
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
type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const formMethods = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      gender: "",
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting: isCreatingNewUser },
  } = formMethods;

  const handleSignIn = async (payload: RegisterFormSchema) => {
    const signUpResponse = await signUp({
      age: payload.age,
      email: payload.email,
      fullName: payload.fullName,
      gender: payload.gender,
      password: payload.password,
    });
    if (signUpResponse?.error) {
      return setSignUpError(signUpResponse?.errorMessage ?? "");
    }

    return router.push("/auth/login");
  };
  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
      }}
    >
      <FormControl fullWidth>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Nome
        </Typography>
        <TextField
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          placeholder="ex: João Silva"
        />
      </FormControl>
      <Box sx={{ display: "flex", gap: "8px", width: "100%" }}>
        <FormControl fullWidth>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Gênero
          </Typography>
          <Controller
            name="gender"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Select {...field} displayEmpty>
                <MenuItem value="" disabled>
                  Escolha um gênero
                </MenuItem>
                {registerGenders.map((gender, index) => (
                  <MenuItem key={index} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.gender && (
            <FormHelperText>{errors.gender.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Idade
          </Typography>
          <TextField
            {...register("age")}
            error={!!errors.age}
            helperText={errors.age?.message}
            placeholder="ex: 10"
            type="number"
          />
        </FormControl>
      </Box>
      <FormControl fullWidth>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          E-mail
        </Typography>
        <TextField
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="ex: joao@gmail.com"
        />
      </FormControl>
      <FormControl fullWidth>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Senha
        </Typography>
        <TextField
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          placeholder="Min. 6 caracteres"
        />
      </FormControl>
      <FormControl fullWidth>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Confirme a senha
        </Typography>
        <TextField
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          placeholder="Repita a senha acima"
        />
      </FormControl>
      {signUpError && <Alert severity="error">{signUpError}</Alert>}
      <Button variant="contained" type="submit" disabled={isCreatingNewUser}>
        Cadastrar-se
      </Button>
    </form>
  );
}
