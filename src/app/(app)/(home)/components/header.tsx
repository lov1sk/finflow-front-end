import { Avatar, Box, Button, Typography } from "@mui/material";
import Logo from "@/assets/app-pages-logo";
import { AvatarDropdown } from "./avatar-dropdown";
import { User } from "@/types/user";
import { getProfile } from "@/http/user/get-profile";

interface HeaderProps {
  user: User;
}
export async function Header() {
  const { success, data: user, error, errorMessage } = await getProfile();
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
      <AvatarDropdown user={user!} />
    </Box>
  );
}
