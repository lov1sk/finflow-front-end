import React from "react";
import { FormControl, SxProps, TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  formatCurrency,
  formatToCurrencyMask,
} from "@/app/utils/material-ui/format-to-currency-mask";

interface CurrencyInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  error?: FieldError;
  control?: Control<T>;
  sx?: SxProps;
}

export function CurrencyInput<T extends FieldValues>({
  name,
  label,
  error,
  control,
  sx,
}: CurrencyInputProps<T>) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label={label}
              variant="outlined"
              fullWidth
              helperText={error && error.message}
              sx={{
                backgroundColor: "#121214",
              }}
              value={
                field.value !== undefined ? formatCurrency(field.value) : ""
              } // Formata o valor para exibição
              onChange={(event) => formatToCurrencyMask(event, field)} // Aplica a máscara durante a mudança
            />
          );
        }}
      />
    </FormControl>
  );
}
