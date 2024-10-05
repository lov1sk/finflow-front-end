"use client";
import { appTheme } from "@/config/theme";
import { ThemeProvider } from "@mui/material/styles";
import "./styles.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
