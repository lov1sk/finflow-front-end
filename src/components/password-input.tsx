import { ShowPasswordIcon } from "@/components/show-password-icon";
import {
  SxProps,
  TextField,
  Button,
  FormControl,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  FieldValues,
  Path,
  Control,
  FieldError,
  Controller,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  size?: "small" | "medium";
  placeholder: string;
  name: Path<T>;
  label: string;
  control?: Control<T>;
  error?: FieldError;
  sx?: SxProps;
}
export function PasswordInput<T extends FieldValues>({
  name,
  label,
  control,
  error,
  placeholder,
  sx,
  size = "medium",
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPasswordClick = () => setShowPassword((state) => !state);
  return (
    <FormControl fullWidth size={size}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!error}
            helperText={error?.message}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            sx={{ ...sx }}
            slotProps={{
              input: {
                endAdornment: (
                  <Button
                    variant="text"
                    sx={{ paddingX: 1 }}
                    onClick={handleShowPasswordClick}
                  >
                    <ShowPasswordIcon showPasswordState={showPassword} />
                  </Button>
                ),
              },
            }}
          />
        )}
      />
    </FormControl>
  );
}
