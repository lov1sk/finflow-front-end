import { FormControl, SxProps, TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  placeholder: string;
  name: Path<T>;
  label: string;
  control?: Control<T>;
  error?: FieldError;
  sx?: SxProps;
}
export function TextInput<T extends FieldValues>({
  name,
  label,
  control,
  error,
  placeholder,
  sx,
}: InputProps<T>) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            sx={{
              ...sx,
              backgroundColor: "#121214",
              borderRadius: "4px",
            }}
            {...field}
            label={label}
            placeholder={placeholder}
            helperText={error?.message}
          />
        )}
      />
    </FormControl>
  );
}
