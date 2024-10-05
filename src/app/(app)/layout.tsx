import { Container } from "@mui/material";
import { Header } from "./(home)/components/header";
import { checkAuthentication } from "@/http/auth/check-authentication";
import { redirect } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = checkAuthentication();
  if (!isAuthenticated) redirect("/auth/login");

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#121214", // Sobrescreve o fundo com essa cor
        color: "#fff",
      }}
    >
      <Container>
        <Header username={"Lucas Ribeiro"} />
        {children}
      </Container>
    </main>
  );
}
