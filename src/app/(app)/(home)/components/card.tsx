import { formatToCurrency } from "@/app/utils/format-to-currency";
import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import Grid from "@mui/material/Grid2";

interface CardProps {
  title: string;
  value?: number;
  icon: ReactNode;
  variant?: "normal" | "green-filled";
}

const cardStyles = {
  normal: {
    backgroundColor: "#323238",
  },
  "green-filled": {
    backgroundColor: "#015F43",
  },
};
export function Card({ title, value, icon, variant }: CardProps) {
  if (!variant) variant = "normal";
  return (
    <Grid
      size={4}
      sx={{
        ...cardStyles[variant],
        color: "#fff",
        paddingY: "24px",
        paddingX: "32px",
        display: "flex",
        minWidth: "350px",
        height: "120px",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "6px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          opacity: "0.9",
        },
      }}
    >
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="caption">{title}</Typography>
        {icon}
      </Stack>

      <Typography variant="h5" fontWeight="bold">
        {formatToCurrency(value)}
      </Typography>
    </Grid>
  );
}
