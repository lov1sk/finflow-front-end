import { Box, SxProps, Typography } from "@mui/material";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface BaseModalProps {
  title: string;
  children: ReactNode;
  sx?: SxProps;
  onClose: () => void;
}
export function BaseModal({ title, children, onClose, sx }: BaseModalProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxHeight: "75%",
        overflowY: "auto",
        paddingY: "24px",
        paddingX: "30px",
        backgroundColor: "#181818",
        color: "#fff",
        borderRadius: "6px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            border: "none",
            width: "24px",
            height: "24px",
          }}
        >
          <X style={{ width: "24px", height: "24px" }} className="btn-hover" />
        </button>
      </Box>
      {children}
    </Box>
  );
}
