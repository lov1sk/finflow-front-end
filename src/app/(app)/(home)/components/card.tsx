import { formatToCurrency } from "@/app/utils/format-to-currency";
import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import Grid from "@mui/material/Grid2";

interface CardProps {
  title: string;
  value: number;
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
        padding: "24px",
        paddingLeft: "32px",
        display: "flex",
        height: "120px",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "6px",
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

      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        {formatToCurrency(value)}
      </Typography>
    </Grid>
  );
}
