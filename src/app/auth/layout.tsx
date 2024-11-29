import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main
      style={{
        display: "grid",
        placeContent: "center",
        backgroundColor: "#121214", // Sobrescreve o fundo com essa cor
        height: "100vh",
        maxWidth: "100vw",
        overflowY: "auto",
      }}
    >
      {children}
    </main>
  );
}
