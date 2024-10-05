import { Box, Typography } from "@mui/material";
import Logo from "@/assets/login-page-logo";
import Link from "next/link";
import { RegisterForm } from "./components/register-form";
export default function RegisterPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        color: "#fff",
        width: "500px",
      }}
    >
      <Logo style={{ margin: "0 auto" }} />
      <RegisterForm />
      <Typography variant="subtitle2" align="center">
        Já possui cadastro ? Clique{" "}
        <Link
          href="/login"
          style={{
            textDecoration: "none",
            color: "#00875F",
          }}
        >
          aqui
        </Link>{" "}
        para entrar na aplicação
      </Typography>
    </Box>
  );
}
