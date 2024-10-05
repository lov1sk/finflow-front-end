import { stringAvatar } from "@/app/utils/material-ui/render-avatar-name";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { ChevronDown } from "lucide-react";
import Logo from "@/assets/app-pages-logo";
import { AvatarDropdown } from "./avatar-dropdown";

interface HeaderProps {
  username: string;
}
export function Header({ username }: HeaderProps) {
  return (
    <Box
      sx={{
        paddingTop: "24px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Logo />
      <AvatarDropdown username={username} />
    </Box>
  );
}
