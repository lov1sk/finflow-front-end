import { Container, Typography } from "@mui/material";
import { Header } from "./(home)/components/header";
import { checkAuthentication } from "@/http/auth/check-authentication";
import { redirect } from "next/navigation";
import { getProfile } from "@/http/user/get-profile";
import { Suspense } from "react";
export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await checkAuthentication();
  console.log({ isAuthenticated });

  if (!isAuthenticated) redirect("/auth/login");

  return (
    <main
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#202024", // Sobrescreve o fundo com essa cor
        color: "#fff",
        background: "linear-gradient(to bottom, #121214 187px, #202024 187px)",
      }}
    >
      <Container maxWidth="lg">
        <Header />
        {children}
      </Container>
    </main>
  );
}
