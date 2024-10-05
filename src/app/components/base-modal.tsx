import { Box, Typography } from "@mui/material";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface BaseModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}
export function BaseModal({ title, children, onClose }: BaseModalProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "450px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        paddingY: "40px",
        paddingX: "48px",
        backgroundColor: "#202024",
        color: "#fff",
        borderRadius: "6px",
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
