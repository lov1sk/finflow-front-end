import { Box, Link, Typography } from "@mui/material";
import { RecoverPasswordForm } from "./components/recover-form";
import Logo from "@/assets/login-page-logo";

export default function RecoverPasswordPage() {
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
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight={"bold"}>
          Recuperar sua senha
        </Typography>
        <Typography variant="subtitle2" sx={{ marginTop: "8px" }}>
          Digite abaixo seu e-mail para recuperar sua senha
        </Typography>
      </Box>
      <RecoverPasswordForm />

      <Typography variant="subtitle2" align="center">
        Clique{" "}
        <Link
          className="a-hover"
          href="/auth/login"
          style={{
            textDecoration: "none",
            color: "#00875F",
          }}
        >
          aqui
        </Link>{" "}
        para voltar para o login
      </Typography>
    </Box>
  );
}
