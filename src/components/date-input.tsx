import { SxProps, FormControl, FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {
  FieldValues,
  Path,
  Control,
  FieldError,
  Controller,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control?: Control<T>;
  error?: FieldError;
  sx?: SxProps;
  size?: "small" | "medium";
};
export function DateInput<T extends FieldValues>({
  name,
  label,
  control,
  error,
  sx,
  size = "medium",
}: Props<T>) {
  return (
    <FormControl fullWidth sx={sx} size={size}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <DatePicker
              {...field}
              label={label}
              sx={{
                bgcolor: "#121212",
              }}
              slotProps={{
                textField: { size },
              }}
              format="DD/MM/YYYY"
            />
          );
        }}
      />
      {error && (
        <FormHelperText style={{ fontSize: 12, color: "#dc2626" }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
