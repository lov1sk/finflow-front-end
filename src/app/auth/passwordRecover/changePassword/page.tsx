import { Box, Link, Typography } from "@mui/material";
import Logo from "@/assets/login-page-logo";
import { ChangePasswordForm } from "./components/change-password-form";

interface ChangePasswordPageProps {
  searchParams?: Promise<{
    token?: string;
    email?: string;
  }>;
}
export default async function ChangePasswordPage(
  props: ChangePasswordPageProps
) {
  const searchParams = await props.searchParams;
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
          Preencha os dados e confirme sua senha
        </Typography>
      </Box>
      <ChangePasswordForm
        token={searchParams?.token ?? ""}
        email={searchParams?.email ?? ""}
      />

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
