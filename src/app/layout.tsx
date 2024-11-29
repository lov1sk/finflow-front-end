"use client";
import { appTheme } from "@/config/theme";
import { ThemeProvider } from "@mui/material/styles";
import "./styles.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
          overflowX: "hidden",
        }}
      >
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"en-gb"}
        >
          <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
