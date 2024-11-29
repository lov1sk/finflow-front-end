import { Box, Typography } from "@mui/material";
import { formatToCurrency } from "../app/utils/format-to-currency";
import { formatToDate } from "../app/utils/format-to-date";

interface PropertyWithLabelProps {
  title: string;
  value: any;
  type: "money" | "text" | "number" | "date";
}
export function PropertyWithLabel({
  title,
  type,
  value,
}: PropertyWithLabelProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      {value && renderValueBasedOnType(type, value)}
      {!value && <Typography>Não informado</Typography>}
    </Box>
  );
}

const renderValueBasedOnType = (type: string, value: any) => {
  switch (type) {
    case "money":
      return (
        <Typography sx={{ color: "#E1E1E6" }}>
          {formatToCurrency(value)}
        </Typography>
      );
    case "text":
      return <Typography sx={{ color: "#E1E1E6" }}>{value}</Typography>;
    case "number":
      return <Typography sx={{ color: "#E1E1E6" }}>{value}</Typography>;
    case "date":
      return (
        <Typography sx={{ color: "#E1E1E6" }}>{formatToDate(value)}</Typography>
      );
    default:
      return null;
  }
};
