import {
  Autocomplete,
  FormControl,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

type SelectOption = {
  key?: string | number;
  label: string;
  value: string | number;
};

type Props<T extends FieldValues> = {
  id: string;
  name: Path<T>;
  label: string;
  control?: Control<T>;
  error?: FieldError;
  options?: SelectOption[];
  loading?: boolean;
  sx?: SxProps;
  size?: "small" | "medium";
};

export function SelectInput<T extends FieldValues>({
  id,
  name,
  label,
  options,
  control,
  error,
  loading,
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
            <Autocomplete
              {...field}
              id={id}
              size={size}
              sx={{
                ...sx,
                backgroundColor: "#121214",
                borderRadius: "4px",
                flexGrow: 1,
              }}
              getOptionLabel={(option) => {
                const selectedOption = options?.find(
                  (opt) => opt.value === option
                );
                return selectedOption ? selectedOption.label : "";
              }}
              isOptionEqualToValue={(option: string | number, value) => {
                return value === "" || value === undefined || option === value;
              }}
              disablePortal
              loading={loading}
              options={options?.map((option) => option.value) || []}
              onChange={(
                _,
                data: string | number | (string | number)[] | null
              ) => {
                field.onChange(data);
              }}
              renderInput={(params) => (
                <TextField {...params} label={label} error={!!error} />
              )}
            />
          );
        }}
      />
      {error && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "0.75rem",
            marginX: "14px",
            marginTop: "3px",
          }}
          color="danger"
        >
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
}
