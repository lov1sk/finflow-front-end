import { Alert, Avatar, Box, Button, Typography } from "@mui/material";
import Logo from "@/assets/app-pages-logo";
import { AvatarDropdown } from "./avatar-dropdown";
import { User } from "@/types/user";
import { getProfile } from "@/http/user/get-profile";
import { signOut } from "@/http/auth/sign-out";
import { LogOut } from "lucide-react";

interface HeaderProps {
  user: User;
}
export async function Header() {
  const { success, data: user, error } = await getProfile();
  return (
    <Box
      sx={{
        paddingTop: "24px",
        display: "flex",
        justifyContent: "space-between",
        zIndex: 10,
      }}
    >
      <Logo />
      {success && user && <AvatarDropdown user={user} />}
      {error && (
        <Alert sx={{ maxWidth: "200px" }} severity="error">
          Erro ao carregar o usuario.{" "}
        </Alert>
      )}
      {error && (
        <Box
          sx={{
            margin: 0,
            width: "210px",
            height: "46px",
            color: "#F87171",
            borderBottom: "1px",
            borderColor: "red",
          }}
          onClick={async () => await signOut()}
        >
          Sair
          <LogOut
            style={{ width: "20px", height: "20px", marginLeft: "auto" }}
          />
        </Box>
      )}
    </Box>
  );
}
