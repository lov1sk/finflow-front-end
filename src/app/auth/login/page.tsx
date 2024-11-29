import { Box, Typography } from "@mui/material";
import { LoginForm } from "./components/login-form";
import Logo from "@/assets/login-page-logo";
import Link from "next/link";
export default function LoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        color: "#fff",
        width: "500px",
        marginX: "auto",
      }}
    >
      <Logo style={{ margin: "0 auto" }} />
      <LoginForm />
      <Typography align="right">
        <Link
          href="/auth/passwordRecover/recover"
          style={{
            textDecoration: "none",
            color: "#fff",
          }}
          className="a-hover"
        >
          Esqueceu sua senha?
        </Link>
      </Typography>

      <Typography variant="subtitle2" align="center">
        Não tem cadastro ainda? Clique{" "}
        <Link
          className="a-hover"
          href="/auth/register"
          style={{
            textDecoration: "none",
            color: "#00875F",
          }}
        >
          aqui
        </Link>{" "}
        para cadastrar-se na aplicação{" "}
      </Typography>
    </Box>
  );
}
