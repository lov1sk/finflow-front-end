import React from "react";
import { FormControl, SxProps, TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { formatToCurrencyMask } from "../utils/material-ui/currency-mask";

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
              sx={{
                ...sx,
                backgroundColor: "#121214",
                borderRadius: "4px",
              }}
              label={label}
              variant="outlined"
              fullWidth
              helperText={error?.message}
              onChange={(event) => formatToCurrencyMask(event, field)}
            />
          );
        }}
      />
    </FormControl>
  );
}
