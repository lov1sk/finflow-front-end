import {
  RadioGroup,
  FormControlLabel,
  SxProps,
  Box,
  Typography,
  Radio,
  FormControl,
  FormHelperText,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface OptionProps {
  value: string;
  label: string;
}
interface RadioSelectProps<T extends FieldValues> {
  name: Path<T>;
  error?: FieldError;
  control?: Control<T>;
  sx?: SxProps;
  options: OptionProps[];
}

export function RadioSelect<T extends FieldValues>({
  name,
  control,
  error,
  sx,
  options,
}: RadioSelectProps<T>) {
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            {...field}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
                label={option.label}
                sx={{
                  margin: 0,
                  backgroundColor: "#29292E",
                  border: "1px solid #181818",
                  paddingY: "8px",
                  paddingX: "30px",
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              />
            ))}
          </RadioGroup>
        )}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
